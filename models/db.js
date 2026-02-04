const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 5432),
  ssl: { rejectUnauthorized: false }, // Neon -> SSL obligatoire
});

pool
  .connect()
  .then((client) => {
    console.log("✅ Connecté à PostgreSQL (Neon)");
    client.release();
  })
  .catch((err) => {
    console.error("❌ Erreur connexion PostgreSQL:", err.message);
  });

module.exports = pool;
