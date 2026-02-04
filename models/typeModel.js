const db = require("./db");

class Type {
  static async getAll() {
    const result = await db.query("SELECT type_id, nom FROM types ORDER BY type_id ASC");
    return result.rows;
  }
}

module.exports = Type;
