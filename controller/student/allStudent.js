const db = require('../../db');

const allStudent = async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM student');
    res.json(data);
  } catch (error) {
    res.status(500);
  }
};

module.exports = allStudent;
