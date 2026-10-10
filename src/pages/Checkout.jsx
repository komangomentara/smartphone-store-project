import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ClipboardCheck } from "lucide-react";
import { formatRupiah } from "../utils/data";
import { useCart } from "../utils/CartContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "Transfer bank" });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Nama wajib diisi.";
    if (!/^[0-9+\-\s]{9,15}$/.test(form.phone.trim())) nextErrors.phone = "Masukkan nomor telepon yang valid.";
    if (!form.address.trim()) nextErrors.address = "Alamat wajib diisi.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setOrder({ ...form, total: totalPrice, count: cart.reduce((sum, item) => sum + item.qty, 0), number: `SH-${Date.now().toString().slice(-6)}` });
      clearCart();
    }
  };

  if (order) return <section className="container-page py-16"><div className="mx-auto max-w-xl rounded-3xl border border-emerald-100 bg-white p-8 text-center soft-shadow"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={36}/></span><p className="mt-5 text-sm font-bold uppercase tracking-widest text-emerald-600">Pesanan berhasil dibuat</p><h1 className="mt-2 text-3xl font-black">Terima kasih, {order.name}!</h1><p className="mt-3 text-slate-500">Ini adalah konfirmasi simulasi. Tidak ada pembayaran atau pengiriman nyata.</p><div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left"><div className="flex justify-between gap-4"><span className="text-sm text-slate-500">Nomor pesanan</span><strong>{order.number}</strong></div><div className="mt-3 flex justify-between gap-4"><span className="text-sm text-slate-500">Jumlah barang</span><strong>{order.count}</strong></div><div className="mt-3 flex justify-between gap-4"><span className="text-sm text-slate-500">Metode pembayaran</span><strong>{order.payment}</strong></div><div className="mt-3 flex justify-between gap-4"><span className="text-sm text-slate-500">Total</span><strong className="text-blue-700">{formatRupiah(order.total)}</strong></div></div><Link to="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">Kembali ke beranda</Link></div></section>;

  if (cart.length === 0) return <section className="container-page py-20 text-center"><ClipboardCheck size={42} className="mx-auto text-slate-300"/><h1 className="mt-4 text-2xl font-black">Belum ada produk untuk checkout</h1><p className="mt-2 text-slate-500">Tambahkan smartphone ke keranjang terlebih dahulu.</p><Link to="/" className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Kembali ke katalog</Link></section>;

  const inputClass = "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
  return <section className="container-page py-8 sm:py-12">
    <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600"><ArrowLeft size={17}/> Kembali ke keranjang</Link>
    <div className="mt-5"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">Langkah terakhir</p><h1 className="mt-2 text-3xl font-black">Checkout</h1><p className="mt-2 text-slate-500">Isi data berikut untuk menyelesaikan simulasi pesanan.</p></div>
    <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
      <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-black">Informasi penerima</h2>
        <div><label className="text-sm font-bold" htmlFor="name">Nama lengkap</label><input id="name" className={inputClass} value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Masukkan nama lengkap"/>{errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}</div>
        <div><label className="text-sm font-bold" htmlFor="phone">Nomor telepon</label><input id="phone" className={inputClass} value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Contoh: 081234567890" inputMode="tel"/>{errors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}</div>
        <div><label className="text-sm font-bold" htmlFor="address">Alamat pengiriman</label><textarea id="address" rows="3" className={inputClass} value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} placeholder="Masukkan alamat lengkap"/>{errors.address && <p className="mt-1 text-xs font-semibold text-red-600">{errors.address}</p>}</div>
        <div><label className="text-sm font-bold" htmlFor="payment">Metode pembayaran (simulasi)</label><select id="payment" className={inputClass} value={form.payment} onChange={(e) => setForm({...form, payment: e.target.value})}><option>Transfer bank</option><option>E-wallet</option><option>COD (bayar di tempat)</option></select></div>
        <button type="submit" className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white hover:bg-blue-700">Konfirmasi pesanan</button>
      </form>
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 soft-shadow"><h2 className="text-lg font-black">Ringkasan belanja</h2><div className="mt-4 space-y-4">{cart.map((item) => <div key={item.id} className="flex justify-between gap-3 text-sm"><div><p className="font-bold">{item.name}</p><p className="mt-1 text-slate-500">{item.qty} × {formatRupiah(item.price)}</p></div><p className="whitespace-nowrap font-bold">{formatRupiah(item.price * item.qty)}</p></div>)}</div><div className="my-5 border-t border-dashed border-slate-200"></div><div className="flex justify-between gap-3"><span className="font-bold">Total</span><span className="text-lg font-black text-blue-700">{formatRupiah(totalPrice)}</span></div><p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">Demo akademik: formulir ini tidak mengirim data ke server dan tidak memproses pembayaran sungguhan.</p></aside>
    </div>
  </section>;
}