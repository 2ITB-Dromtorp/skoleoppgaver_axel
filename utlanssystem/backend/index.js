// backend/index.js
const express = require('express');
const app = express();
const port = 3500;
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // Import bcrypt
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'minskole'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/', (request, response) => {
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) {
      console.error('Error executing query:', error);
      response.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('Query results:', results);
    response.json(results);
  });
});

// Modify login route handler to use bcrypt
// New route to fetch equipment data
app.get('/equipment', (request, response) => {
  connection.query('SELECT * FROM utstyr', function (error, results) {
    if (error) {
      console.error('Error fetching equipment data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    response.json(results);
  });
});

// POST /borrow - endpoint to handle borrowing an item
app.post('/borrow', (request, response) => {
  const { elevID, utstyrsID } = request.body;
  const today = new Date().toISOString().slice(0, 10);

  const sql = 'INSERT INTO utlan (utstyrsID, elevID, Dato) VALUES (?, ?, ?)';
  connection.query(sql, [utstyrsID, elevID, today], (err, result) => {
      if (err) {
          console.error('Failed to create borrowing record:', err);
          return response.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
      response.status(201).json({ message: 'Borrowing recorded successfully', utlanID: result.insertId });
  });
});



app.post('/login', (request, response) => {
  let { brukernavn, passord } = request.body;
  connection.query('SELECT * FROM users WHERE brukernavn = ?', [brukernavn], async function (error, results) {
    if (error) {
      response.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      response.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    const user = results[0];
    const hashedPassword = user.passord;
    const match = await bcrypt.compare(passord, hashedPassword);
    if (match) {
      // Fetch full name from the table where names are stored
      connection.query('SELECT Fornavn, Etternavn FROM elev WHERE menneskeID = ?', [user.userid], function (err, nameResults) {
        if (err || nameResults.length === 0) {
          response.status(500).json({ message: 'Failed to retrieve user information', isLoggedIn: false });
        } else {
          const fullName = nameResults[0].Fornavn + ' ' + nameResults[0].Etternavn;
          response.status(200).json({ message: 'Login successful', isLoggedIn: true, fullName: fullName });
        }
      });
    } else {
      response.status(401).json({ error: 'Invalid username or password' });
    }
  });
});




app.post('/register', async (request, response) => {
  let { brukernavn, passord, userid } = request.body;  // Removed 'admin' from destructuring

  try {
    const hashedPassword = await bcrypt.hash(passord, 10); // 10 is the salt rounds

    // Automatically set 'admin' to 0 during insertion
    connection.query('INSERT INTO users (brukernavn, passord, admin, userid) VALUES (?, ?, 0, ?)', 
      [brukernavn, hashedPassword, userid], function (error, results, fields) {
        if (error) {
          console.error('Error executing query:', error);
          response.status(500).json({ error: 'Internal Server Error', details: error.sqlMessage });
          return;
        }
        response.status(200).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    response.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
