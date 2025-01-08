const db = require('../../../db');

const createSemester = async (req, res) => {
  try {
    const { semester } = req.body;

    // CHECK EXISTING SEMESTER
    const [similar] = await db.execute(
      'SELECT semester FROM semester where semester = ?',
      [semester],
    );
    if (similar.length > 0) {
      return res.json({
        message: `Semester '${semester}' already exists! Try different name?`,
      });
    }

    // CREATE NEW SEMESTER
    await db.execute('INSERT INTO semester (semester) values (?)', [semester]);

    res.json({
      status: 'success',
      message: `Semester '${newSemester}' has been created!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = createSemester;
