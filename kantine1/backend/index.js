const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3500;

app.use(cors({
  origin: 'http://localhost:3000', // Adjust depending on your front-end URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secretKey', // Use a strong secret for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

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

app.post('/register', async (req, res) => {
  const { epost, passord, fulltNavn } = req.body;
  const hashedPassword = await bcrypt.hash(passord, 10);
  const verifisert = 0; // New accounts are not verified

  connection.query(
    'INSERT INTO admin (fulltNavn, epost, passord, verifisert) VALUES (?, ?, ?, ?)', 
    [fulltNavn, epost, hashedPassword, verifisert],
    (err, results) => {
      if (err) {
        console.error('Error registering new admin:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Admin registered successfully, pending verification' });
    }
  );
});


// User Login
app.post('/login', (req, res) => {
  const { epost, passord } = req.body;

  connection.query(
    'SELECT * FROM admin WHERE epost = ?',
    [epost],
    async (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      const user = results[0];
      if (!(await bcrypt.compare(passord, user.passord))) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else if (user.verifisert !== 1) {
        res.status(403).json({ error: 'Account not verified' });
      } else {
        req.session.userId = user.id;
        req.session.fulltNavn = user.fulltNavn; // Save full name in session
        res.status(200).json({ message: 'Login successful', fulltNavn: user.fulltNavn });
      }
    }
  );
});


app.post('/login', (req, res) => {
  const { epost, passord } = req.body;
  connection.query('SELECT * FROM admin WHERE epost = ?', [epost], async (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0 || !(await bcrypt.compare(passord, results[0].passord))) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      req.session.userId = results[0].id;
      req.session.fulltNavn = results[0].fulltNavn; // Save full name in session
      res.status(200).json({ message: 'Login successful', fulltNavn: results[0].fulltNavn });
    }
  });
});

// Check session and retrieve user info
app.get('/check-session', (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ isLoggedIn: false });
  } else {
    res.status(200).json({ isLoggedIn: true, fulltNavn: req.session.fulltNavn });
  }
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out successfully' });
});

app.get('/produkter', (req, res) => {
  const query = 'SELECT * FROM produkter WHERE lager > 0';  // Only products with stock
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products for main page:', err);
      res.status(500).json({ error: 'Failed to fetch products for main page' });
      return;
    }
    res.json(results);
  });
});

app.get('/admin/produkter', (req, res) => {
  const query = 'SELECT * FROM produkter';  // This will include all products
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products for admin:', err);
      res.status(500).json({ error: 'Failed to fetch products for admin' });
      return;
    }
    res.json(results);
  });
});

// Backend: Decrease stock when a product is purchased
app.post('/purchase', (req, res) => {
  const { productId, quantity } = req.body;  // 'quantity' is the number of items purchased

  const query = 'UPDATE produkter SET lager = lager - ? WHERE id = ? AND lager >= ?';
  connection.query(query, [quantity, productId, quantity], (err, result) => {
    if (err) {
      console.error('Error updating stock:', err);
      res.status(500).json({ error: 'Failed to update product stock' });
      return;
    }
    if (result.affectedRows === 0) {
      // This means either the product doesn't exist or there isn't enough stock
      res.status(400).json({ message: 'Insufficient stock or product does not exist' });
    } else {
      res.json({ message: 'Purchase successful', productId, quantity });
    }
  });
});


app.post('/incrementstock/:id', (req, res) => {
  const { id } = req.params; // product ID
  const incrementAmount = 1; // Increment stock by 1

  const query = 'UPDATE produkter SET lager = lager + ? WHERE id = ?';
  connection.query(query, [incrementAmount, id], (err, result) => {
    if (err) {
      console.error('Error updating stock:', err);
      res.status(500).json({ error: 'Failed to update product stock' });
      return;
    }
    if (result.affectedRows === 0) {
      // No rows updated, this means the product does not exist
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ message: 'Stock incremented successfully', productId: id });
    }
  });
});


app.post('/produkter', (req, res) => {
  const { produktNavn, produktDeskripsjon, pris, lager } = req.body;
  if (!req.session.userId) { // Check session before inserting
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (lager === undefined || lager === null) {
    return res.status(400).json({ error: 'Stock value must be provided' });
  }

  connection.query(
    'INSERT INTO produkter (produktNavn, produktDeskripsjon, pris, lager) VALUES (?, ?, ?, ?)',
    [produktNavn, produktDeskripsjon, pris, lager],
    (err, results) => {
      if (err) {
        console.error('Error inserting product:', err);
        res.status(500).json({ error: 'Failed to add product' });
        return;
      }
      res.status(201).json({ message: 'Product added successfully', id: results.insertId });
    }
  );
});


app.put('/oppdaterprodukter/:id', (req, res) => {
  const { id } = req.params;
  const { produktNavn, produktDeskripsjon, pris, lager } = req.body;  // include 'lager' in the body

  if (req.session.userId) {
      connection.query('UPDATE produkter SET produktNavn = ?, produktDeskripsjon = ?, pris = ?, lager = ? WHERE id = ?', 
      [produktNavn, produktDeskripsjon, pris, lager, id], (err, results) => {
          if (err) {
              console.error('Error updating product:', err);
              res.status(500).json({ error: 'Failed to update product' });
              return;
          }
          res.status(200).json({ message: 'Product updated successfully' });
      });
  } else {
      res.status(401).json({ error: 'Unauthorized' });
  }
});


app.delete('/deleteprodukter/:id', (req, res) => {
  const { id } = req.params;
  if (req.session.userId) { // Check session before deleting
    connection.query('DELETE FROM produkter WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product' });
        return;
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});