import mysql2 from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

const con = mysql2.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  insecureAuth : true
});

con.connect((err) => {
  if (err) throw err;
  con.query(`CREATE DATABASE IF NOT EXISTS ??`, process.env.DB_NAME), (err: string) => {
    if (err) throw err;
    console.log("Database created");
  };
  con.end();
});