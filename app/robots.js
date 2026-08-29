import { getSite } from '@/lib/site';

export default async function robots() {
  const site = await getSite();
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
