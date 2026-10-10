import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <footer id="tentang" className={`mt-16 bg-slate-950 text-slate-300 ${location.pathname === "/checkout" ? "mt-0" : ""}`}>
        <div className="container-page grid gap-8 py-10 sm:grid-cols-2">
          <div><p className="text-xl font-black text-white">smarthub<span className="text-blue-400">.</span></p><p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Temukan smartphone pilihan untuk menemani produktivitas dan hiburanmu.</p></div>
          <div className="sm:text-right"><p className="font-bold text-white">Smartphone Store</p><p className="mt-2 text-sm text-slate-400">Proyek pembelajaran React & Tailwind CSS</p><p className="mt-1 text-xs text-slate-500">© 2026 SmartHub. Demo untuk keperluan akademik.</p></div>
        </div>
      </footer>
    </div>
  );
}