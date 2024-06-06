const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'kantine'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/produkter', (req, res) => {
  const query = 'SELECT * FROM produkter';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL database:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }
    res.json(results);
  });
});

app.post('/produkter', (req, res) => {
  const { produktNavn, produktDeskripsjon, pris } = req.body;
  const query = 'INSERT INTO produkter (produktNavn, produktDeskripsjon, pris) VALUES (?, ?, ?)';
  connection.query(query, [produktNavn, produktDeskripsjon, pris], (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL database:', err);
      res.status(500).json({ error: 'Failed to add product' });
      return;
    }
    res.status(201).json({ message: 'Product added successfully', id: results.insertId });
  });
});

app.put('/produkter/:id', (req, res) => {
  const { id } = req.params;
  const { produktNavn, produktDeskripsjon, pris } = req.body;
  const query = 'UPDATE produkter SET produktNavn = ?, produktDeskripsjon = ?, pris = ? WHERE id = ?';
  connection.query(query, [produktNavn, produktDeskripsjon, pris, id], (err, results) => {
    if (err) {
      console.error('Error updating data in MySQL database:', err);
      res.status(500).json({ error: 'Failed to update product' });
      return;
    }
    res.status(200).json({ message: 'Product updated successfully' });
  });
});

app.delete('/produkter/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM produkter WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data from MySQL database:', err);
      res.status(500).json({ error: 'Failed to delete product' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
