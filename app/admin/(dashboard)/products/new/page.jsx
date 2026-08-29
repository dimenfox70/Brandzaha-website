import ProductForm from '../ProductForm';
import { createProduct } from '../actions';

export default function NewProductPage({ searchParams }) {
  return (
    <div className="admin-page">
      <header className="admin-page__head"><div><p className="admin-eyebrow">Products</p><h1>New product</h1></div></header>
      <ProductForm action={createProduct} error={searchParams?.error} />
    </div>
  );
}
