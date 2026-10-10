import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { formatRupiah } from "../utils/data";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-slate-100">
        <img src={product.img} alt={product.name} className="product-image h-52 w-full object-cover sm:h-56" loading="lazy" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x450/e2e8f0/334155?text=Smartphone"; }} />
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{product.brand}</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-500"><Star size={14} fill="currentColor" /> {product.rating}</span>
        </div>
        <Link to={`/product/${product.id}`} className="block text-base font-bold text-slate-900 hover:text-blue-600">{product.name}</Link>
        <p className="mt-1 text-xs text-slate-500">{product.memory} · Stok {product.stock}</p>
        <p className="mt-3 text-lg font-black text-slate-900">{formatRupiah(product.price)}</p>
        <div className="mt-4 flex gap-2">
          <Link to={`/product/${product.id}`} className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-center text-sm font-bold text-slate-700 hover:bg-slate-50">Detail</Link>
          <button onClick={() => onAdd(product)} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-bold text-white hover:bg-blue-700" aria-label={`Tambah ${product.name} ke keranjang`}><ShoppingCart size={17} /><span className="hidden md:inline">Tambah</span></button>
        </div>
      </div>
    </article>
  );
}