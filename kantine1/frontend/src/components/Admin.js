import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [produkter, setProdukter] = useState([]);
  const [newProduct, setNewProduct] = useState({
    produktNavn: '',
    produktDeskripsjon: '',
    pris: '',
    lager: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
    fetchProducts();
  }, []);

  const checkSession = () => {
    axios.get('http://localhost:3500/check-session', { withCredentials: true })
      .then(response => {
        setUser(response.data.fulltNavn);
      })
      .catch(error => {
        console.error('Session check failed:', error);
        setUser(null);
      });
  };

  const fetchProducts = () => {
    axios.get('http://localhost:3500/admin/produkter', { withCredentials: true })
      .then(response => {
        setProdukter(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.produktNavn.trim()) {
      alert("Product name is required.");
      return;
    }
    const method = editingProduct ? 'put' : 'post';
    const url = editingProduct ? `http://localhost:3500/produkter/${editingProduct.id}` : 'http://localhost:3500/produkter';

    axios[method](url, newProduct, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        fetchProducts();
        setNewProduct({
          produktNavn: '',
          produktDeskripsjon: '',
          pris: '',
          lager: ''
        });
        setEditingProduct(null);
      })
      .catch(error => {
        console.error('There was an error updating the product:', error);
      });
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:3500/produkter/${id}`, { withCredentials: true })
        .then(response => {
          console.log(response.data);
          fetchProducts();
        })
        .catch(error => {
          console.error('There was an error deleting the product:', error);
        });
    }
  };

  const incrementStock = (productId) => {
    axios.post(`http://localhost:3500/incrementstock/${productId}`, {}, { withCredentials: true })
      .then(response => {
        console.log('Stock incremented successfully');
        fetchProducts();
      })
      .catch(error => {
        console.error('Error updating stock:', error);
      });
  };

  const handleLogout = () => {
    axios.post('http://localhost:3500/logout', {}, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setUser(null);
        navigate('/');
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user ? (
        <div>Welcome, {user} <button onClick={handleLogout}>Logout</button></div>
      ) : (
        <div>
          <p>You are not logged in. You cannot do any changes, or see customer information.</p>
          <button onClick={redirectToLogin}>Login</button>
          <button onClick={redirectToRegister}>Register</button>
          <p>After registration, wait for IT to verify your account.</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="produktNavn"
          value={newProduct.produktNavn}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
          disabled={!user}
        />
        <input
          type="text"
          name="produktDeskripsjon"
          value={newProduct.produktDeskripsjon}
          onChange={handleInputChange}
          placeholder="Product Description"
          disabled={!user}
        />
        <input
          type="number"
          name="pris"
          value={newProduct.pris}
          onChange={handleInputChange}
          placeholder="Price"
          required
          disabled={!user}
        />
        <input
          type="number"
          name="lager"
          value={newProduct.lager}
          onChange={handleInputChange}
          placeholder="Stock"
          required
          disabled={!user}
        />
        <button type="submit" disabled={!user}>{editingProduct ? 'Update' : 'Add'} Product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produkter.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.produktNavn}</td>
              <td>{product.produktDeskripsjon}</td>
              <td>{product.pris}</td>
              <td>
                {product.lager}
                {user && <button onClick={() => incrementStock(product.id)}>+1</button>}
              </td>
              <td>
                {user && <button onClick={() => handleEdit(product)}>Edit</button>}
                {user && <button onClick={() => handleDelete(product.id)}>Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
