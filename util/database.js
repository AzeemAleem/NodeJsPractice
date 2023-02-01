const mySql = require("mysql2");

const pool = mySql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "Pass22@22",
});

module.exports = pool.promise();
