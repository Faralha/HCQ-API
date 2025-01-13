const db = require('../../../db');

const fetchSubClass = async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM JENIS');
    res.json(data);
  } catch (error) {
    res.status(500);
  }
};

module.exports = fetchSubClass;
