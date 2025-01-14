const db = require('../../../db');

const fetchClass = async (req, res) => {
  try {
    const [data] = await db.execute(`
      SELECT class.*, mentor.name AS mentor_name
      FROM class
      JOIN mentor ON class.mentor = mentor.id
    `);
    res.json(data);
  } catch (error) {
    res.status(500);
  }
};

module.exports = fetchClass;
