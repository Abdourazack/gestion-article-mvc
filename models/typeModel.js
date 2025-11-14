const db = require("./db");

class Type {
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM types";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Type;
