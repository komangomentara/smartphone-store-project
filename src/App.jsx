import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<div className="container-page py-20 text-center"><h1 className="text-3xl font-black">Halaman tidak ditemukan</h1><a className="mt-4 inline-block text-blue-600 underline" href="/">Kembali ke beranda</a></div>} />
      </Route>
    </Routes>
  );
}