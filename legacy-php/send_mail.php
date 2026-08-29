<?php
/**
 * BrandZaha — hardened lead-form handler.
 * All forms POST here. Sanitises input, checks honeypot + rate-limit,
 * sends mail() to the configured recipient, returns JSON {success,message}.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$RECIPIENT = 'Brandzaha@gmail.com';
$SUBJECT_PREFIX = '[BrandZaha Lead]';

function respond(bool $ok, string $message, int $code = 200): void {
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// ---- Honeypot ----
if (!empty($_POST['website'])) {
    // Silently accept to not tip off bots
    respond(true, 'Thank you — we’ll be in touch shortly.');
}

// ---- Simple per-IP rate limit (file-based, 4 / 10 min) ----
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$bucket = sys_get_temp_dir() . '/bz_rl_' . md5($ip);
$now = time();
$hits = [];
if (is_file($bucket)) {
    $hits = array_filter((array) json_decode((string) file_get_contents($bucket), true), fn($t) => $t > $now - 600);
}
if (count($hits) >= 4) {
    respond(false, 'Too many messages — please try again in a few minutes.', 429);
}
$hits[] = $now;
@file_put_contents($bucket, json_encode(array_values($hits)), LOCK_EX);

// ---- Collect & sanitise ----
function clean(string $key, int $max = 2000): string {
    $v = trim((string) ($_POST[$key] ?? ''));
    $v = str_replace(["\r", "\n"], [' ', ' '], $v); // header-injection guard for single-line fields
    return mb_substr($v, 0, $max);
}

$name  = clean('name', 120);
$email = clean('email', 160);
$phone = clean('phone', 40);
$formName = clean('form_name', 60) ?: 'Website';
$pageUrl  = clean('page_url', 200);

// Message can keep newlines
$message = trim((string) ($_POST['message'] ?? ''));
$message = mb_substr($message, 0, 5000);

// Optional structured fields
$extraKeys = ['project_type', 'budget', 'timeline', 'service', 'course', 'duration', 'subject'];
$extras = [];
foreach ($extraKeys as $k) {
    $val = clean($k, 200);
    if ($val !== '') { $extras[$k] = $val; }
}

// ---- Validate ----
if ($name === '' || mb_strlen($name) < 2) {
    respond(false, 'Please enter your name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}
if ($message === '' && empty($extras)) {
    respond(false, 'Please add a short message.');
}

// ---- Compose ----
$labels = [
    'project_type' => 'Project type', 'budget' => 'Budget', 'timeline' => 'Timeline',
    'service' => 'Service', 'course' => 'Course', 'duration' => 'Duration', 'subject' => 'Subject',
];
$lines = [
    'New enquiry via ' . $formName,
    str_repeat('-', 40),
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Phone:   ' . ($phone ?: '—'),
];
foreach ($extras as $k => $v) {
    $lines[] = sprintf('%-8s %s', ($labels[$k] ?? ucfirst($k)) . ':', $v);
}
$lines[] = '';
$lines[] = 'Message:';
$lines[] = $message ?: '—';
$lines[] = '';
$lines[] = str_repeat('-', 40);
$lines[] = 'Page:  ' . ($pageUrl ?: '—');
$lines[] = 'IP:    ' . $ip;
$lines[] = 'Time:  ' . date('Y-m-d H:i:s');

$body = implode("\n", $lines);
$subject = $SUBJECT_PREFIX . ' ' . $formName . ' — ' . $name;

$safeName = preg_replace('/[^\x20-\x7E]/', '', $name);
$headers  = [];
$headers[] = 'From: BrandZaha Website <no-reply@brandzaha.com>';
$headers[] = 'Reply-To: ' . $safeName . ' <' . $email . '>';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: BrandZaha';

$sent = @mail($RECIPIENT, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    respond(true, 'Thank you, ' . htmlspecialchars($safeName, ENT_QUOTES) . '! We’ll be in touch within one business day.');
}
respond(false, 'Sorry, the message could not be sent right now. Please email us directly at ' . $RECIPIENT . '.', 500);
