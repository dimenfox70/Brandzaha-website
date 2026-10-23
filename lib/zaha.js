// Zaha AI Shopping Assistant: the page path and the links used across the site.
// Page copy lives in app/zaha-ai-shopping-assistant/page.jsx.

export const zaha = {
  path: '/zaha-ai-shopping-assistant',
  // Merchant dashboard on the app subdomain.
  loginUrl: 'https://zaha-ai-shopping-assistant.brandzaha.com/login',
  // The contact form reads ?subject= and shows it as the enquiry topic.
  setupDayHref: `/contact?subject=${encodeURIComponent('Zaha setup day (₹599)')}`,
};

export default zaha;
