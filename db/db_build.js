const fs = require('fs');

const dbConnection = require('./db_connections.js');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const runDbBuild = dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log("Gaymers directory created with result: ", res);
});

module.export = runDbBuild;
