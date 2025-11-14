const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "gestion_articles",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur connexion MySQL:", err);
    return;
  }
  console.log("Connecté à la base MySQL");
});

module.exports = connection;
