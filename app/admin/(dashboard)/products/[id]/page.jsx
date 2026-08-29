import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import ProductForm from '../ProductForm';
import { updateProduct, deleteProduct } from '../actions';
import DeleteButton from '../../DeleteButton';

export default async function EditProductPage({ params, searchParams }) {
  const db = supabaseAdmin();
  const { data: product } = await db.from('products').select('*').eq('id', params.id).maybeSingle();
  if (!product) notFound();

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div><p className="admin-eyebrow">Products</p><h1>{product.name}</h1></div>
        <DeleteButton action={deleteProduct.bind(null, product.id)} confirmText="Delete this product? This can’t be undone." />
      </header>
      <ProductForm action={updateProduct.bind(null, product.id)} product={product} error={searchParams?.error} />
    </div>
  );
}
