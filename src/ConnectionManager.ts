const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "poc_factory",
  password: "abhiram1007"
});

export default connection;
