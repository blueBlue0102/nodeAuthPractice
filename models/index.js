const { Pool } = require("pg");
const pool = new Pool();

module.exports = {
  async query(text, params) {
    try {
      const result = await pool.query(text, params);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
