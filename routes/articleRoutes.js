const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const upload = require("../middleware/upload");

// Routes
router.get("/", articleController.listArticles);
router.get("/add", articleController.showAddForm);
router.post("/add", upload.single("photo"), articleController.createArticle);

router.get("/edit/:id", articleController.showEditForm);
router.post(
  "/edit/:id",
  upload.single("photo"),
  articleController.updateArticle
);

router.get("/delete/:id", articleController.deleteArticle);
router.get("/search", articleController.searchByType);

module.exports = router;
