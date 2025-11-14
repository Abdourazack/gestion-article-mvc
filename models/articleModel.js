const db = require("../models/db"); // ⚠️ Assure-toi que ce chemin est correct

class Article {
  // 🔍 Récupérer tous les articles avec leurs types
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT articles.*, types.nom AS type_nom 
        FROM articles 
        JOIN types ON articles.type_id = types.type_id
      `;
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // 🔍 Récupérer un article par ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM articles WHERE id = ?`;
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  // ➕ Créer un article
  static create(article) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO articles (titre, description, photo, prix, type_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      const params = [
        article.titre,
        article.description,
        article.photo,
        article.prix,
        article.type_id,
      ];
      db.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // ✏️ Modifier un article
  static update(id, article) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE articles
        SET titre = ?, description = ?, photo = ?, prix = ?, type_id = ?
        WHERE id = ?
      `;
      const params = [
        article.titre,
        article.description,
        article.photo,
        article.prix,
        article.type_id,
        id,
      ];
      db.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // ❌ Supprimer un article
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM articles WHERE id = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // 🔍 Récupérer les articles par type
  static getByType(type_id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT articles.*, types.nom AS type_nom 
        FROM articles 
        JOIN types ON articles.type_id = types.type_id
        WHERE articles.type_id = ?
      `;
      db.query(sql, [type_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Article;
