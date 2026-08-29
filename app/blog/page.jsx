import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import Poster from '@/components/Poster';
import TiltCard from '@/components/TiltCard';
import Magnetic from '@/components/Magnetic';

export const metadata = {
  title: 'Blog & Insights',
  description: 'Field notes on design, web development, e-commerce, AI and marketing from the BrandZaha studio in Jaipur.',
  alternates: { canonical: '/blog' },
};

const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = posts[0];
  return (
    <main id="main">
      <section className="page-head wrap">
        <div className="glow hero__glow-b" aria-hidden="true" style={{ opacity: 0.16 }} />
        <p className="eyebrow"><Reveal as="span">Insights</Reveal></p>
        <h1 className="page-head__title"><SplitText hero text="The" /><br /><span className="text-accent"><SplitText hero text="journal." /></span></h1>
        <Reveal as="p" className="page-head__lead lead" delay={0.15}>Ideas, playbooks and honest lessons on design, building and growing on the web.</Reveal>
      </section>

      <section className="section wrap">
        <TiltCard className="work-card" max={4} cursor="Read" style={{ aspectRatio: '21 / 9' }}>
          <Link href={`/blog/${featured.slug}`} style={{ position: 'absolute', inset: 0, display: 'block' }} aria-label={featured.title}>
            <div className="work-card__media"><Poster palette={featured.palette} seed={featured.slug} alt={featured.title} /></div>
            <div className="tilt__glare" aria-hidden="true" />
            <div className="work-card__overlay">
              <div className="work-card__top"><div className="work-card__cat"><span className="chip">Featured</span><span className="chip">{featured.category}</span></div></div>
              <div className="work-card__bottom"><h3 style={{ maxWidth: '20ch' }}>{featured.title}</h3><p className="work-card__summary">{featured.excerpt}</p></div>
            </div>
          </Link>
        </TiltCard>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="post-grid">
          {posts.slice(1).map((post, i) => (
            <Reveal key={post.slug} className="post-card" delay={(i % 3) * 0.06}>
              <Link href={`/blog/${post.slug}`} className="post-card__media" aria-label={post.title}><Poster palette={post.palette} seed={post.slug} alt={post.title} /></Link>
              <div className="post-card__body">
                <span className="post-card__meta">{post.category} · {fmt(post.date)}</span>
                <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p className="muted">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="post-card__more">Read more →</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="cta-band">
          <span className="glow cta-band__glow" aria-hidden="true" />
          <h2 className="h2 display" style={{ position: 'relative' }}><SplitText text="Let’s build your next chapter." /></h2>
          <div className="mt-3" style={{ position: 'relative' }}><Magnetic><Link href="/contact" className="btn"><span className="btn__label">Start a project</span> <span className="btn__arrow" aria-hidden="true">↗</span></Link></Magnetic></div>
        </Reveal>
      </section>
    </main>
  );
}
