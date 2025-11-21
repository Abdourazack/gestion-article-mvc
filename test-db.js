require('dotenv').config();
const connection = require('./db');

connection.query('SELECT 1 + 1 AS result', (err, results) => {
  if (err) console.error("❌ Erreur :", err);
  else console.log("✅ Connexion OK :", results);
  connection.end();
});
