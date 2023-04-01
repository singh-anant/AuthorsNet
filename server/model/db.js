const mysql = require("mysql");
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Anant@12",
  database: "blog",
});

module.exports = db;
