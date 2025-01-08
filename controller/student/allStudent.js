const db = require('../../db');

const allStudent = async (req, res) => {
  try {
    const [result] = await db.execute('SELECT * FROM student');
    res.json({
      data: result,
      status: 'success',
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = allStudent;
