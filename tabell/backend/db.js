const express = require('express');
const app = express();
const port = 3500;
var mysql = require('mysql');
var cors = require('cors');

app.use(cors());
app.use(express.json());

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'minskole'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

app.get('/', (request, response) => {
  connection.query('SELECT * FROM elev', function (error, results, fields) {
    if (error) {
      console.error('Error retrieving data:', error);
      response.status(500).send('Error retrieving data.');
    } else {
      response.send(JSON.stringify(results));
    }
  });
});

app.post("/insert", (req, res) => {
  const newData = req.body;

  connection.query("INSERT INTO elev SET ?", newData, (error, results) => {
    if (error) {
      console.error("Feil ved innsetting av data:", error);
      res.status(500).send("Feil ved innsetting av data.");
    } else {
      console.log("Data lagt til vellykket.");
      res.status(200).send("Data lagt til vellykket.");
    }
  });
});

app.get("/updateuser/:newhobby/:id", (request, response) => {
  let newHobby = request.params.newhobby;
  let id = request.params.id;

  let sqlquery = 'UPDATE elev SET Hobby=? WHERE ElevID=?';

  connection.query(sqlquery, [newHobby, id], function (error, results, fields) {
    if (error) {
      console.error('Error updating data:', error);
      response.status(500).send('Error updating data.');
    } else {
      response.send('Data oppdatert vellykket!');
    }
  });
});

app.delete("/delete/:id", (request, response) => {
  let id = request.params.id;

  let sqlquery = 'DELETE FROM elev WHERE ElevID=?';

  connection.query(sqlquery, [id], function (error, results, fields) {
    if (error) {
      console.error('Error deleting data:', error);
      response.status(500).send('Error deleting data.');
    } else if (results.affectedRows === 0) {
      console.error('Ingen rader ble slettet. ElevID eksisterer kanskje ikke.');
      response.status(404).send('Ingen rader ble slettet. ElevID eksisterer kanskje ikke.');
    } else {
      response.send('Data slettet vellykket!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
