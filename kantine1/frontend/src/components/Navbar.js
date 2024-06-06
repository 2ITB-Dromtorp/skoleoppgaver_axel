// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../viken.svg'; // Adjust the path accordingly

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 30px', backgroundColor: '#f8f8f8' }}>
      <Link to="/">
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
      </Link>
      <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '24px' }}>Products</Link>
      <Link to="/cart" style={{ textDecoration: 'none', color: 'black', fontSize: '24px' }}>Cart</Link>
    </nav>
  );
}

export default Navbar;
