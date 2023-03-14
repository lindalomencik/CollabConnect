const res = require('express/lib/response');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "test1234"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
const title = "lock";
const sql = "SELECT title FROM `sighted-side-db`.locked_sections WHERE id=19;";
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
    });
  });