import mysql from "mysql2/promise";
let connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "forme",
});
export default connection;
