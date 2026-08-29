import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import PostForm from '../PostForm';
import { updatePost, deletePost } from '../actions';
import DeleteButton from '../../DeleteButton';

export default async function EditPostPage({ params, searchParams }) {
  const db = supabaseAdmin();
  const { data: post } = await db.from('posts').select('*').eq('id', params.id).maybeSingle();
  if (!post) notFound();

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div><p className="admin-eyebrow">Blog</p><h1>{post.title}</h1></div>
        <DeleteButton action={deletePost.bind(null, post.id)} confirmText="Delete this post? This can’t be undone." />
      </header>
      <PostForm action={updatePost.bind(null, post.id)} post={post} error={searchParams?.error} />
    </div>
  );
}
