import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState(() => {
    try {
      const saved = localStorage.getItem('klgw_quote');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('klgw_quote', JSON.stringify(quoteItems));
  }, [quoteItems]);

  const addToCart = (product) => {
    // Use cartKey (productId-size) to allow different sizes as separate entries
    const key = product.cartKey || `${product.id}-${product.selectedSize || 'default'}`;
    setQuoteItems(prev => {
      const existing = prev.find(item => (item.cartKey || item.id) === key);
      if (existing) {
        return prev.map(item => (item.cartKey || item.id) === key ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) } : item);
      }
      return [...prev, { ...product, cartKey: key, quantity: product.quantity || 1 }];
    });
    setIsQuoteOpen(true);
  };

  const updateQuantity = (cartKey, newQuantity) => {
    if (newQuantity < 1) return;
    setQuoteItems(prev => prev.map(item => (item.cartKey || item.id) === cartKey ? { ...item, quantity: newQuantity } : item));
  };

  // Fix: remove by cartKey so different sizes can be removed independently
  const removeFromCart = (cartKey) => {
    setQuoteItems(prev => prev.filter(item => (item.cartKey || item.id) !== cartKey));
  };

  const clearQuote = () => setQuoteItems([]);

  // Aliases so existing components don't break
  const cartItems = quoteItems;
  const cartCount = quoteItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const isCartOpen = isQuoteOpen;
  const setIsCartOpen = setIsQuoteOpen;

  return (
    <CartContext.Provider value={{
      quoteItems,
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearQuote,
      isQuoteOpen,
      setIsQuoteOpen,
      isCartOpen,
      setIsCartOpen,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};
