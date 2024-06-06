
// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Admin from './components/Admin';
import Register from './components/Register';
import OrderComplete from './components/OrderComplete';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
