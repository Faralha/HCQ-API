const db = require('../../../db');
const sanitizeInput = require('../../../function/sanitizeInput');

const queryAttendance = async (req, res) => {
  try {
    const student = sanitizeInput(req.query.student);
    const classes = sanitizeInput(req.params.classes);

    const [results] = await db.execute(
      `SELECT * FROM attendance as a LEFT JOIN student as s ON a.id_student = s.id WHERE LOWER(s.name) LIKE LOWER('%${student}%') AND a.id_class = '?'`,
      [classes],
    );

    res.json({
      queries: results,
    });
    console.log(classes);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = queryAttendance;
