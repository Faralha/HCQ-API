const db = require('../../db');
const sanitizeInput = require('../../function/sanitizeInput');

const assignStudent = async (req, res) => {
  try {
    let classes = req.params.classes ? sanitizeInput(req.params.classes) : null;
    const student = req.query.std ? sanitizeInput(req.query.std) : null;

    await db.execute(
      'INSERT INTO student_class (id_class, id_student) VALUES (?,?)',
      [classes, student],
    );

    res.json({
      message: `${student} has been assigned to ${classes}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = assignStudent;
