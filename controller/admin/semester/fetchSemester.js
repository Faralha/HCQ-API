const db = require('../../../db');

const getSemester = async (req, res) => {
  try {
    const [semester] = await db.execute(
      'SELECT semester FROM semester ORDER BY semester DESC LIMIT 1',
    );
    res.send(semester);
  } catch (error) {
    res.status(500);
  }
};

module.exports = getSemester;