import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return previous;
        return previous.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...previous, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => setCart((previous) =>
    previous.map((item) => item.id === id ? { ...item, qty: Math.min(item.stock, Math.max(1, Number(qty) || 1)) } : item)
  );

  const removeFromCart = (id) => setCart((previous) => previous.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart, totalQty, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart harus digunakan di dalam CartProvider");
  return context;
}