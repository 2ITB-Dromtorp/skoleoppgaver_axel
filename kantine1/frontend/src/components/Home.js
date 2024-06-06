
// components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';

function Home() {
  const [produkter, setProdukter] = useState([]);
  const { addToCart, notification } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3500/produkter')
      .then(response => {
        setProdukter(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  };

  return (
    <div className="App">
      <Navbar />
      <h1>Produkter Available</h1>
      {notification && <div className="notification">{notification}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {produkter.map(produkt => (
          <div key={produkt.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
            <h4>{produkt.produktNavn}</h4>
            <p>{produkt.produktDeskripsjon}</p>
            <p>{produkt.pris},-</p>
            <p>Stock: {produkt.lager}</p>
            <button onClick={() => addToCart(produkt)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
