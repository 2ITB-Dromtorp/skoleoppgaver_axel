import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [produkter, setProdukter] = useState([]);
  const [newProduct, setNewProduct] = useState({
    produktNavn: '',
    produktDeskripsjon: '',
    pris: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3500/produkter')
      .then(response => {
        setProdukter(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingProduct) {
      axios.put(`http://localhost:3500/produkter/${editingProduct.id}`, newProduct)
        .then(response => {
          console.log(response.data);
          fetchProducts();
          setNewProduct({
            produktNavn: '',
            produktDeskripsjon: '',
            pris: ''
          });
          setEditingProduct(null);
        })
        .catch(error => {
          console.error('There was an error updating the product!', error);
        });
    } else {
      axios.post('http://localhost:3500/produkter', newProduct)
        .then(response => {
          console.log(response.data);
          fetchProducts();
          setNewProduct({
            produktNavn: '',
            produktDeskripsjon: '',
            pris: ''
          });
        })
        .catch(error => {
          console.error('There was an error adding the product!', error);
        });
    }
  };

  const handleEdit = (product) => {
    setNewProduct({
      produktNavn: product.produktNavn,
      produktDeskripsjon: product.produktDeskripsjon,
      pris: product.pris
    });
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3500/produkter/${id}`)
      .then(response => {
        console.log(response.data);
        fetchProducts();
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  return (
    <div className="App">
      <h1>Produkter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Produkt Navn:
            <input
              type="text"
              name="produktNavn"
              value={newProduct.produktNavn}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Produkt Beskrivelse:
            <input
              type="text"
              name="produktDeskripsjon"
              value={newProduct.produktDeskripsjon}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Pris:
            <input
              type="number"
              name="pris"
              value={newProduct.pris}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
        {editingProduct && (
          <button type="button" onClick={() => {
            setNewProduct({
              produktNavn: '',
              produktDeskripsjon: '',
              pris: ''
            });
            setEditingProduct(null);
          }}>Cancel</button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produkt Navn</th>
            <th>Produkt Beskrivelse</th>
            <th>Pris</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produkter.map(produkt => (
            <tr key={produkt.id}>
              <td>{produkt.id}</td>
              <td>{produkt.produktNavn}</td>
              <td>{produkt.produktDeskripsjon}</td>
              <td>{produkt.pris}</td>
              <td>
                <button onClick={() => handleEdit(produkt)}>Edit</button>
                <button onClick={() => handleDelete(produkt.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
