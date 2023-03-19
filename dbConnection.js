var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "34.173.83.112",
  user: "root",
  password: "test1234",
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
const dbName = `sighted-side-db`;
const title = "lock";
const sql = "SELECT * FROM `sighted-side-db`.locked_sections WHERE id=19;";
const sql1 = "show databases;";
const sql2 = "use `sighted-side-db`;";
const sql3 = "show tables;";

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    //con.query(sql, (err, response) =>{console.log("response" + JSON.stringify(response))});
  });
});
