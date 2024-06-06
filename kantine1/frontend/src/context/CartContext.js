// context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");

  const addToCart = (product, quantity = 1) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item => item.id === product.id ? {...item, quantity: item.quantity + quantity} : item));
    } else {
      setCartItems([...cartItems, {...product, quantity}]);
    }
    setNotification(`${product.produktNavn} added to cart`);
    setTimeout(() => {
      setNotification("");
    }, 1500);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item => item.id === productId ? {...item, quantity} : item));
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.pris * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, getTotalPrice, notification }}>
      {children}
    </CartContext.Provider>
  );
};
