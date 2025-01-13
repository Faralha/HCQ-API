const db = require('../../../db');

const fetchClass = async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM class');
    res.json(data);
  } catch (error) {
    res.status(500);
  }
};

module.exports = fetchClass;
