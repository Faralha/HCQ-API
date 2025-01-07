const db = require('../../db');

const fetchSubClass = async (req, res) => {
  try {
    const [subclass] = await db.execute('SELECT * FROM JENIS');
    res.send(subclass);
  } catch (error) {
    res.status(500);
  }
};

module.exports = fetchSubClass;
