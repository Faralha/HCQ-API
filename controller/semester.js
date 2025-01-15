const db = require('../db');

const semester = async (req, res) => {
  try {
    const [semester] = await db.execute(
      'SELECT semester FROM semester ORDER BY semester DESC',
    );
    res.send(semester);
  } catch (error) {
    res.status(500);
  }
};

module.exports = semester;
