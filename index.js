require('dotenv').config()

const express = require('express')
const app = express()
var mysql = require('mysql');

app.set('views', './views');
app.set('view engine', 'pug');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "mydb"
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

app.get('/', (req, res) => {
	res.render('index');
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })