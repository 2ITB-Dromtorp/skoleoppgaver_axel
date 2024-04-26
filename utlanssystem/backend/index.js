// app.js (backend)
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
  connection.query('SELECT * FROM elev', function (error, results, fields) {
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
app.post('/login', (request, response) => {
  let { username, password } = request.body;

  connection.query('SELECT * FROM users WHERE username = ?', [username], async function (error, results, fields) {
    if (error) {
      console.error('Error executing query:', error);
      response.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      response.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    const user = results[0];
    const hashedPassword = user.password;

    try {
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        // Passwords match, login successful
        response.status(200).json({ message: 'Login successful' });
      } else {
        // Passwords don't match
        response.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

// Modify registration route handler to use bcrypt
app.post('/register', async (request, response) => {
  let { username, password, isAdmin, elevID } = request.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert the user into the database with the hashed password
    connection.query('INSERT INTO users (username, password, isAdmin, elevID) VALUES (?, ?, ?, ?)', [username, hashedPassword, isAdmin, elevID], function (error, results, fields) {
      if (error) {
        console.error('Error executing query:', error);
        response.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      response.status(200).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});