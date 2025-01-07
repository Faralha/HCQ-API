const db = require('../../db');

const fetchSubClass = async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM JENIS');
    res.json({ data, status: 'success' });
  } catch (error) {
    res.status(500);
  }
};

module.exports = fetchSubClass;
