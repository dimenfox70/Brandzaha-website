import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '@/lib/posts';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import Poster from '@/components/Poster';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Not found' };
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` } };
}
const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return (
    <main id="main">
      <section className="page-head wrap">
        <p className="eyebrow"><Reveal as="span">{post.category} · {fmt(post.date)}</Reveal></p>
        <h1 className="h1" style={{ maxWidth: '20ch', marginTop: '1rem' }}><SplitText hero text={post.title} /></h1>
        <Reveal as="p" className="page-head__lead lead" delay={0.15}>{post.excerpt}</Reveal>
        <p className="muted mt-2">By {post.author}</p>
      </section>

      <section className="section wrap">
        <div className="split__media" style={{ aspectRatio: '21/9', marginBottom: 'clamp(2rem,5vw,4rem)' }}><Poster palette={post.palette} seed={post.slug} alt={post.title} /></div>
        <div className="prose" style={{ marginInline: 'auto' }}>
          {post.content ? (
            post.content.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <>
              <p>This is a preview of an upcoming BrandZaha insight. The full article is being written — in the meantime, our team is happy to talk through the ideas behind it.</p>
              <p>We publish honest, practical field notes on design, web development, e-commerce, AI and growth. Want the finished piece or to discuss how it applies to your project?</p>
              <p><Link href="/contact">Get in touch →</Link></p>
            </>
          )}
        </div>
        <div className="center mt-3"><Link href="/blog" className="tlink" style={{ fontSize: 'var(--step-1)' }}>← Back to journal</Link></div>
      </section>
    </main>
  );
}
