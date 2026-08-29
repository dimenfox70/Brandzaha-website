import PostForm from '../PostForm';
import { createPost } from '../actions';

export default function NewPostPage({ searchParams }) {
  return (
    <div className="admin-page">
      <header className="admin-page__head"><div><p className="admin-eyebrow">Blog</p><h1>New post</h1></div></header>
      <PostForm action={createPost} error={searchParams?.error} />
    </div>
  );
}
