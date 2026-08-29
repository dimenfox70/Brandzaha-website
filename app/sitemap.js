import { getSite } from '@/lib/site';
import { getProjects } from '@/lib/projects';
import { getPosts } from '@/lib/posts';

export default async function sitemap() {
  const [site, projects, posts] = await Promise.all([getSite(), getProjects(), getPosts()]);
  const base = site.domain;
  const now = new Date();
  const core = ['', '/work', '/services', '/ecommerce', '/about', '/blog', '/contact'];
  const urls = core.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.8 }));
  projects.forEach((p) => urls.push({ url: `${base}/work/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 }));
  posts.forEach((p) => urls.push({ url: `${base}/blog/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  return urls;
}
