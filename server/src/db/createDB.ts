import mysql, { createConnection } from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

const con: createConnection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

con.connect((err: string) => {
  if (err) throw err;
  con.query(`CREATE DATABASE IF NOT EXISTS ??`, process.env.DB_NAME), (err: string) => {
    if (err) throw err;
    console.log("Database created");
  };
  con.end();
});