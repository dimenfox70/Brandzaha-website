'use client';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { FigureArt, ShirtArt } from './Art';
import TryOnSlider from './TryOnSlider';

const LOOP_MS = 17500;

function buildScript(c) {
  return [
    { id: 'ask', who: 'user', text: c.ask, step: 0, at: 500 },
    { id: 'typing-1', typing: true, step: 1, at: 1300, until: 2300 },
    { id: 'found', who: 'bot', kind: 'products', text: c.found, step: 1, at: 2300 },
    { id: 'try-ask', who: 'user', text: c.tryAsk, step: 2, at: 5000 },
    { id: 'working', who: 'bot', kind: 'working', text: c.tryWorking, step: 2, at: 5800, until: 7800 },
    { id: 'tryon', who: 'bot', kind: 'tryon', text: c.tryDone, step: 2, at: 7800 },
    { id: 'size', who: 'bot', kind: 'sizes', text: c.sizeAsk, step: 3, at: 10600 },
    { id: 'confirm', who: 'user', text: c.confirm, step: 3, at: 12300 },
    { id: 'typing-2', typing: true, step: 3, at: 12900, until: 13700 },
    { id: 'added', who: 'bot', kind: 'added', text: c.added, step: 3, at: 13700 },
  ];
}

function stepStarts(script) {
  const starts = [];
  script.forEach((e) => { if (starts[e.step] === undefined) starts[e.step] = e.at; });
  starts[0] = 0;
  return starts;
}

function Bubble({ item, c, sageIndex }) {
  if (item.typing) {
    return <div className="chat-typing" aria-hidden="true"><i /><i /><i /></div>;
  }
  if (item.who === 'user') return <div className="zh-msg is-user">{item.text}</div>;

  return (
    <div className="zh-msg is-bot">
      <p>{item.text}</p>
      {item.kind === 'products' && (
        <div className="zh-cards">
          {c.products.map((p, i) => (
            <div key={p.name} className={`zh-card ${i === sageIndex ? 'is-picked' : ''}`}>
              <div className="zh-card__img"><ShirtArt color={p.color} shade={p.shade} /></div>
              <strong>{p.name}</strong>
              <span>{p.price}</span>
            </div>
          ))}
        </div>
      )}
      {item.kind === 'working' && <span className="zh-working" aria-hidden="true"><i /></span>}
      {item.kind === 'tryon' && (
        <TryOnSlider
          compact
          hint={false}
          label="Compare before and after"
          before={<FigureArt className="zh-fig" shirt="#3a3a42" shade="#2b2b32" collar="tee" />}
          after={<FigureArt className="zh-fig" shirt={c.products[sageIndex].color} shade={c.products[sageIndex].shade} collar="camp" />}
        />
      )}
      {item.kind === 'sizes' && (
        <div className="zh-sizes" aria-hidden="true">
          {c.sizes.map((s) => <span key={s} className={s === c.sizePick ? 'is-on' : ''}>{s}</span>)}
        </div>
      )}
      {item.kind === 'added' && <span className="zh-added"><Icon name="bag" size={14} /> {c.addedItem}</span>}
    </div>
  );
}

export default function ChatDemo({ content, video }) {
  const c = content.chat;
  const script = useRef(buildScript(c)).current;
  const starts = useRef(stepStarts(script)).current;
  const sageIndex = Math.max(0, c.products.findIndex((p) => /sage/i.test(p.name)));

  // Server render / no JS / reduced motion: the whole conversation, static.
  const [t, setT] = useState(Infinity);
  const [loop, setLoop] = useState(0);
  const [wide, setWide] = useState(false);
  const [videoStep, setVideoStep] = useState(-1);
  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const videoRef = useRef(null);
  const timers = useRef([]);
  const playing = useRef(false);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const play = useCallback((from = 0) => {
    clearTimers();
    playing.current = true;
    setT(from);
    const points = [...new Set(script.flatMap((e) => [e.at, e.until].filter((x) => x !== undefined && x > from)))].sort((a, b) => a - b);
    points.forEach((p) => timers.current.push(setTimeout(() => setT(p), p - from)));
    timers.current.push(setTimeout(() => {
      setLoop((n) => n + 1);
      play(0);
    }, LOOP_MS - from));
  }, [script]);

  const pause = useCallback(() => { clearTimers(); playing.current = false; }, []);

  // Mock chat: play while on screen.
  useEffect(() => {
    if (video) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!playing.current) play(0); } else pause();
    }, { threshold: 0.3 });
    io.observe(rootRef.current);
    return () => { io.disconnect(); pause(); };
  }, [video, play, pause]);

  // Keep the newest message in view inside the phone.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body || t === Infinity) return;
    body.scrollTo({ top: body.scrollHeight, behavior: t === 0 ? 'auto' : 'smooth' });
  }, [t]);

  // Real recording: play while on screen, steps follow the cue points.
  useEffect(() => {
    const v = videoRef.current;
    if (!video || !v) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) v.controls = false;
    const onMeta = () => setWide(v.videoWidth > v.videoHeight);
    const onTime = () => {
      const cues = content.videoCues;
      let s = 0;
      cues.forEach((cue, i) => { if (v.currentTime >= cue) s = i; });
      setVideoStep(s);
    };
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('timeupdate', onTime);
    if (v.readyState >= 1) onMeta();
    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting) v.play().catch(() => { v.controls = true; });
      else v.pause();
    }, { threshold: 0.3 });
    io.observe(v);
    return () => { io.disconnect(); v.removeEventListener('loadedmetadata', onMeta); v.removeEventListener('timeupdate', onTime); };
  }, [video, content.videoCues]);

  const visible = script.filter((e) => e.at <= t && (e.until === undefined || t < e.until));
  const animating = t !== Infinity;
  const current = animating ? (visible.length ? visible[visible.length - 1].step : 0) : -1;
  const activeStep = video ? videoStep : current;
  const added = script.find((e) => e.id === 'added');
  const bagCount = t >= added.at ? 1 : 0;

  const jump = (i) => {
    if (video) {
      const v = videoRef.current;
      if (v) { v.currentTime = content.videoCues[i] || 0; v.play().catch(() => {}); }
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    play(starts[i]);
  };

  const stepEnd = (i) => (i + 1 < starts.length ? starts[i + 1] : LOOP_MS - 800);

  return (
    <div className="zh-demo" ref={rootRef}>
      <div className="zh-demo__copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="h2 display zh-h2">{content.title}</h2>
        <p className="lead zh-demo__lead">{content.lead}</p>
        <ol className="zh-steps">
          {content.steps.map((s, i) => (
            <li key={s.title} className={`zh-step ${activeStep === i ? 'is-active' : ''} ${activeStep > i ? 'is-done' : ''}`}>
              <button type="button" onClick={() => jump(i)} aria-current={activeStep === i ? 'step' : undefined}>
                <span className="zh-step__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="zh-step__body">
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </span>
              </button>
              {activeStep === i && !video && (
                <i key={`${loop}-${i}-${starts[i]}`} className="zh-step__bar" style={{ animationDuration: `${stepEnd(i) - Math.max(starts[i], 0)}ms` }} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className={`zh-device ${wide ? 'is-wide' : ''}`}>
        <div className="phone__frame zh-device__frame">
          {!wide && <span className="phone__notch" aria-hidden="true" />}
          <div className="phone__screen zh-device__screen">
            {video ? (
              <video
                ref={videoRef}
                className="zh-device__video"
                src={video.src}
                poster={video.poster || undefined}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={content.videoLabel}
              />
            ) : (
              <div className="zh-chat" role="img" aria-label={`Chat demo. ${c.ask} ${c.found} ${c.products.map((p) => `${p.name} ${p.price}`).join(', ')}. ${c.tryAsk} ${c.sizeAsk} ${c.confirm}. ${c.added}`}>
                <div className="zh-chat__head" aria-hidden="true">
                  <span className="chat-head__avatar zh-chat__avatar">Z</span>
                  <span>
                    <span className="chat-head__name">{content.assistant.name}</span>
                    <span className="chat-head__status">{content.assistant.status}</span>
                  </span>
                  <span className="zh-chat__bag"><Icon name="bag" size={18} />{bagCount > 0 && <b key={loop}>{bagCount}</b>}</span>
                </div>
                <div className={`zh-chat__body ${animating ? 'is-live' : ''}`} ref={bodyRef} data-lenis-prevent aria-hidden="true">
                  {visible.map((item) => (
                    <Fragment key={`${loop}-${item.id}`}>
                      <Bubble item={item} c={c} sageIndex={sageIndex} />
                    </Fragment>
                  ))}
                </div>
                <div className="zh-chat__input" aria-hidden="true">
                  <span>{c.inputPlaceholder}</span>
                  <Icon name="mic" size={16} />
                  <i><Icon name="send" size={14} /></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
