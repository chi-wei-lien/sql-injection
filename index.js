require('dotenv').config()

const express = require('express')
const app = express()
var mysql = require('mysql');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get('/', async (req, res) => {
  con.query("SELECT * FROM customers", await function (err, result, fields) {
    if (err) throw err;
    res.render('index', {customers: result});
  });
});

app.post('/', async (req, res) => {
  // var sql = "SELECT * FROM customers WHERE name = " + mysql.escape(req.body.name);
  var sql = `SELECT * FROM customers WHERE name = '${req.body.name}'`;

  console.log(sql);
  con.query(sql, await function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.status(500).render('error_500');
    }
    console.log("result" + result);
    res.render('index', {customers: result});
  });
  
})

app.get('/error', async (req, res) => {
  res.render('error');
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })



  // SELECT * FROM customers WHERE name = ''; SELECT schema_name FROM information_schema.schemata; -- ''
  // SELECT * FROM customers WHERE name = ''; SELECT schema_name FROM information_schema.schemata; -- '';