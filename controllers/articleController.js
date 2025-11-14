const Article = require("../models/articleModel");
const Type = require("../models/typeModel");

// ✅ Liste des articles avec regroupement par type + recherche
exports.listArticles = async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.trim().toLowerCase() : null;
    const allArticles = await Article.getAll();
    const types = await Type.getAll();
    const success = req.query.success || null;

    // 🔍 Filtrage par titre
    const filteredArticles = query
      ? allArticles.filter((a) => a.titre.toLowerCase().startsWith(query))
      : allArticles;

    // 📂 Regroupement par catégorie
    const grouped = {};
    filteredArticles.forEach((a) => {
      const cat = a.type_nom || "Sans catégorie";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(a);
    });

    res.render("articles/index", {
      grouped,
      types,
      searchQuery: query,
      searchType: null,
      success,
    });
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
};

// ✅ Formulaire d'ajout
exports.showAddForm = async (req, res) => {
  try {
    const types = await Type.getAll();
    res.render("articles/create", { types, errorMessage: null });
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
};

// ✅ Création d’un article
exports.createArticle = async (req, res) => {
  try {
    const { titre, description, prix } = req.body;
    const typeIdRaw = req.body.type_id;
    const type_id = parseInt(typeIdRaw, 10);

    if (!typeIdRaw || isNaN(type_id)) {
      const types = await Type.getAll();
      return res.render("articles/create", {
        types,
        errorMessage: "Veuillez sélectionner un type valide.",
      });
    }

    const photo = req.file ? `images/${req.file.filename}` : null;
    await Article.create({ titre, description, photo, prix, type_id });

    res.redirect("/articles?success=Article ajouté avec succès !");
  } catch (err) {
    res.status(500).send("Erreur lors de l'ajout : " + err.message);
  }
};

// ✅ Formulaire d’édition
exports.showEditForm = async (req, res) => {
  try {
    const article = await Article.getById(req.params.id);
    if (!article) return res.status(404).send("Article non trouvé");

    const types = await Type.getAll();
    res.render("articles/edit", {
      article,
      types,
      errorMessage: null,
    });
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
};

// ✅ Modification d’un article
exports.updateArticle = async (req, res) => {
  try {
    const { titre, description, prix, existingPhoto } = req.body;
    const typeIdRaw = req.body.type_id;
    const type_id = parseInt(typeIdRaw, 10);

    if (!typeIdRaw || isNaN(type_id)) {
      const article = await Article.getById(req.params.id);
      const types = await Type.getAll();
      return res.render("articles/edit", {
        article,
        types,
        errorMessage: "Veuillez sélectionner un type valide.",
      });
    }

    const photo = req.file ? `images/${req.file.filename}` : existingPhoto;

    await Article.update(req.params.id, {
      titre,
      description,
      photo,
      prix,
      type_id,
    });

    res.redirect("/articles?success=Article modifié avec succès !");
  } catch (err) {
    res.status(500).send("Erreur lors de la modification : " + err.message);
  }
};

// ✅ Suppression
exports.deleteArticle = async (req, res) => {
  try {
    await Article.delete(req.params.id);
    res.redirect("/articles?success=Article supprimé avec succès !");
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
};

// ✅ Filtrer par type
exports.searchByType = async (req, res) => {
  try {
    const type_id = req.query.type;
    const types = await Type.getAll();
    const articles = type_id
      ? await Article.getByType(type_id)
      : await Article.getAll();

    // Regroupement par catégorie
    const grouped = {};
    articles.forEach((a) => {
      const cat = a.type_nom || "Sans catégorie";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(a);
    });

    res.render("articles/index", {
      grouped,
      types,
      searchType: type_id,
      searchQuery: null,
      success: null,
    });
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
};
