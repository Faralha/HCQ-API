const db = require('../../../db');

const fetchJenis = async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM jenis');
    res.json({ data, status: 'success' });
  } catch (error) {
    res.status(500);
  }
};

module.exports = fetchJenis;
