// db.js
var mysql = require('mysql');
const express = require('express')
const app = express()
const port = 3500
var cors = require("cors")

app.use(express.json())

app.use(cors())

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'axel',
  password: '123',
  database: 'dromtorp'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


app.get('/', (req, res) => {
  connection.query("SELECT * FROM elev", function (err, result) {
    res.send(result)
  })
})

app.listen(port, () => {
  console.log("exapmple app running")
})