import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShoppingCart, Star } from "lucide-react";
import { products, formatRupiah } from "../utils/data";
import { useCart } from "../utils/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const { addToCart } = useCart();
  if (!product) return <section className="container-page py-20 text-center"><h1 className="text-2xl font-black">Produk tidak ditemukan</h1><Link to="/" className="mt-4 inline-block text-blue-600 underline">Kembali ke katalog</Link></section>;
  return <section className="container-page py-8 sm:py-12">
    <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600"><ArrowLeft size={17}/> Kembali ke katalog</Link>
    <div className="mt-6 grid gap-8 rounded-3xl border border-slate-200 bg-white p-5 soft-shadow sm:p-8 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl bg-slate-100"><img src={product.img} alt={product.name} className="h-80 w-full object-cover sm:h-[440px]" onError={(e) => {e.currentTarget.src="https://placehold.co/800x700/e2e8f0/334155?text=Smartphone";}}/></div>
      <div className="flex flex-col justify-center">
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">{product.brand}</span>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{product.name}</h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-amber-500"><Star size={17} fill="currentColor"/><strong>{product.rating}/5</strong><span className="text-slate-400">· Rating simulasi</span></p>
        <p className="mt-5 text-3xl font-black text-blue-700">{formatRupiah(product.price)}</p>
        <p className="mt-5 leading-7 text-slate-600">{product.description}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">{[["Memori", product.memory],["Warna", product.color],["Stok tersedia", `${product.stock} unit`],["Merek", product.brand]].map(([label, value]) => <div key={label} className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-bold">{value}</p></div>)}</div>
        <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 size={17}/> Tersedia untuk simulasi pemesanan</p>
        <button onClick={() => addToCart(product)} className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white hover:bg-blue-700"><ShoppingCart size={19}/> Tambahkan ke keranjang</button>
      </div>
    </div>
  </section>;
}