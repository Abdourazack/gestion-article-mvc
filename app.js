// app.js

const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// EJS config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const articleRoutes = require("./routes/articleRoutes");
app.use("/articles", articleRoutes);

// ✅ Page d'accueil personnalisée
app.get("/", (req, res) => {
  res.render("home"); // Assure-toi que views/home.ejs existe
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré : http://localhost:${PORT}`);
});
