import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Smartphone } from "lucide-react";
import { useCart } from "../utils/CartContext";

export default function Navbar() {
  const { totalQty } = useCart();
  const linkClass = ({ isActive }) => `text-sm font-semibold transition ${isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`;
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-[76px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"><Smartphone size={23} /></span>
          <span className="text-lg font-black tracking-tight text-slate-900">smart<span className="text-blue-600">hub.</span></span>
        </Link>
        <nav className="hidden items-center gap-7 sm:flex">
          <NavLink to="/" className={linkClass}>Beranda</NavLink>
          <a href="/#katalog" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Katalog</a>
          <a href="/#tentang" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Tentang</a>
        </nav>
        <Link to="/cart" className="relative flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-800 hover:border-blue-300 hover:text-blue-600">
          <ShoppingBag size={19} /><span className="hidden sm:inline">Keranjang</span>
          {totalQty > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs text-white">{totalQty}</span>}
        </Link>
      </div>
    </header>
  );
}