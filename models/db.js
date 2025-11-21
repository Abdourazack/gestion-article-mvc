const mysql = require("mysql2");
require("dotenv").config(); // ← assure-toi que dotenv est chargé

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Erreur connexion MySQL:", err);
    return;
  }
  console.log("✅ Connecté à la base MySQL");
});

module.exports = connection;
