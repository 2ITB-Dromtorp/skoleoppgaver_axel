const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'minskole'
});

connection.connect(function(err) {

  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.get('/', (request, response) => {

  connection.query('SELECT * FROM elev', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    response.send(JSON.stringify(results));
  });
  
})
app.get('/update:newhobby', (request, response) => {

  let newhobby = request.params.newhobby;
  console.log(newhobby);
  response.send('Got a GET request at /updateuser');

})

app.get('/update:newhobby:id', (request, response) => {

  let newhobby = request.params.newhobby;
  let id = request.params.id;
  response.send('Got a GET request at /updateuser');
  console.log(newhobby);
  // connection.query('UPDATE elev SET hobby='+newhobby' WHERE ElevID='+id;
  console.log(sqlquery);
  
    if (error) throw error;
    console.log('The solution is: ', results);
    response.send(JSON.stringify(results));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
