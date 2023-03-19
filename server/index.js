const express = require('express');
const mysql = require('promise-mysql');
const app = express();
require("dotenv").config();

// console.log(process.env.DB_NAME);


app.use(express.json());
const port = 3306;
app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});

// app.get("/", async (req, res) => {
//   res.json({status: "ready"})
// });

// app.get("/id", async (req, res) => {
//   const query = "SELECT * FROM `sighted-side-db`.locked_sections;";
//   pool.query(query, (error, results) => {
//     console.log("Result: " + JSON.stringify(results));
//   });
// });

const createUnixSocketPool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});

const ensureSchema = async pool => {
  // Wait for tables to be created (if they don't already exist).
  await pool.query(
    `CREATE TABLE IF NOT EXISTS votes
      ( vote_id SERIAL NOT NULL, time_cast timestamp NOT NULL,
      candidate CHAR(6) NOT NULL, PRIMARY KEY (vote_id) );`
  );
  console.log("Ensured that table 'votes' exists");
};


const createPoolAndEnsureSchema = async () =>
  await createPool()
    .then(async pool => {
      await ensureSchema(pool);
      return pool;
    })
    .catch(err => {
      logger.error(err);
      throw err;
    });
  
let pool = createUnixSocketPool;

app.use(async (req, res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await createPoolAndEnsureSchema();
    next();
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});
  

app.get("/id", async (req, res) => {
  const query = "SELECT * FROM `sighted-side-db`.locked_sections;";
  pool.query(query, (error, results) => {
    console.log("Result: " + JSON.stringify(results));
  });
});