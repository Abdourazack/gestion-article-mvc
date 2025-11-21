const mysql = require("mysql2");
require("dotenv").config(); // ← assure-toi que dotenv est chargé

const connection = mysql.createConnection({
  host: "mysql-gestionarticle.alwaysdata.net",
    user: "442010",            // ← ton vrai user MySQL Alwaysdata
    password: "TON_MDP_MYSQL", // ← le vrai mot de passe de la base
    database: "gestionarticle_mvc"
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Erreur connexion MySQL:", err);
    return;
  }
  console.log("✅ Connecté à la base MySQL");
});

module.exports = connection;
