const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() => {
    // Expand this table definition as needed:
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS responses (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        completed BOOLEAN NOT NULL DEFAULT false,
        session VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        addressId INT,
        paymentId INT
      )`
    );
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS addresses (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        line1 VARCHAR(255) NOT NULL,
        line2 VARCHAR(255),
        city VARCHAR(255) NOT NULL,
        state VARCHAR(2) NOT NULL,
        zip INT NOT NULL,
        phone VARCHAR(255)
      )`
    );
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS payments (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        number VARCHAR(255) NOT NULL,
        expiration VARCHAR(255) NOT NULL,
        cvv INT(3) NOT NULL,
        zip INT NOT NULL
      )`
    );
  })
  .catch((err) => console.log(err));

module.exports = db;
