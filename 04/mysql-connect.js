require('dotenv').config();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS mynodedb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Agsjhf85845@41",
  database: "mynodedb"
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});