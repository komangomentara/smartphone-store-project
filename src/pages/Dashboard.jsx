import { useMemo, useState } from "react";
import { Search, ShieldCheck, Truck, Headphones, ArrowRight, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../utils/data";
import { useCart } from "../utils/CartContext";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sort, setSort] = useState("featured");
  const { addToCart } = useCart();
  const categories = ["Semua", ...new Set(products.map((p) => p.category))];
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase()) && (category === "Semua" || p.category === category));
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  return (
    <>
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="container-page grid items-center gap-8 py-14 sm:py-20 md:grid-cols-[1.1fr_.9fr]">
          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-xs font-bold tracking-wide text-blue-300">SMARTPHONE STORE · 2026</span>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Teknologi terbaik, <span className="text-blue-400">di genggamanmu.</span></h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">Temukan smartphone yang cocok dengan kebutuhanmu. Pilihan cerdas untuk kerja, belajar, dan hiburan.</p>
            <a href="#katalog" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-950/40 hover:bg-blue-500">Jelajahi Katalog <ArrowRight size={18}/></a>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300"><span className="flex items-center gap-2"><ShieldCheck size={17} className="text-blue-400"/> Produk pilihan</span><span className="flex items-center gap-2"><Truck size={17} className="text-blue-400"/> Pengiriman mudah</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-blue-600/25 blur-3xl"></div>
            <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=90" alt="Pilihan smartphone modern" className="relative h-72 w-full rounded-3xl object-cover shadow-2xl sm:h-96" onError={(e) => {e.currentTarget.src="https://placehold.co/800x600/1e293b/ffffff?text=Smartphone+Store";}}/>
            <div className="absolute -bottom-4 left-4 rounded-2xl bg-white p-4 text-slate-900 shadow-xl sm:left-8"><p className="text-xs font-semibold text-slate-500">Pilihan untukmu</p><p className="mt-1 text-lg font-black">Upgrade pengalamanmu.</p></div>
          </div>
        </div>
      </section>
      <section className="container-page grid gap-3 py-7 sm:grid-cols-3">
        {[["Pilihan Smartphone","Katalog berbagai merek"],["Informasi Transparan","Harga dan stok ditampilkan"],["Belanja Praktis","Keranjang dalam satu klik"]].map(([title, desc]) => <div key={title} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Headphones size={21}/></span><div><p className="font-bold">{title}</p><p className="mt-1 text-xs text-slate-500">{desc}</p></div></div>)}
      </section>
      <section id="katalog" className="container-page scroll-mt-24 py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-blue-600">Katalog produk</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Temukan smartphone-mu</h2><p className="mt-2 text-sm text-slate-500">Pilih perangkat yang paling sesuai dengan kebutuhan.</p></div>
          <div className="relative w-full sm:max-w-xs"><Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama atau merek..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/></div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300"}`}>{item}</button>)}</div>
          <label className="flex items-center gap-2 text-sm text-slate-500"><SlidersHorizontal size={16}/><span>Urutkan</span><select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-2 font-semibold text-slate-700 outline-none"><option value="featured">Pilihan</option><option value="low">Harga terendah</option><option value="high">Harga tertinggi</option><option value="rating">Rating tertinggi</option></select></label>
        </div>
        <p className="mt-5 text-sm text-slate-500">Menampilkan <strong className="text-slate-800">{filteredProducts.length}</strong> produk</p>
        {filteredProducts.length > 0 ? <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart}/>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><p className="text-lg font-bold">Produk tidak ditemukan</p><p className="mt-2 text-sm text-slate-500">Coba kata kunci atau kategori lain.</p><button onClick={() => {setQuery(""); setCategory("Semua");}} className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">Reset pencarian</button></div>}
        <div className="mt-12 rounded-3xl bg-blue-600 p-7 text-white sm:flex sm:items-center sm:justify-between sm:p-10"><div><p className="text-sm font-bold text-blue-100">Mau melihat pilihanmu?</p><h3 className="mt-1 text-2xl font-black">Cek keranjang belanja</h3><p className="mt-2 text-sm text-blue-100">Tinjau produk dan total belanja sebelum checkout.</p></div><Link to="/cart" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-700 hover:bg-blue-50 sm:mt-0">Buka keranjang <ArrowRight size={17}/></Link></div>
      </section>
    </>
  );
}