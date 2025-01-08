const db = require('../../../db');

const assignStudent = async (req, res) => {
  try {
    // RETRIEVE DATA
    const { classes, student } = req.body;
    console.log(classes, student);
    if (!classes || !student) {
      return res.status(400).json({
        message: 'Please provide class and student',
      });
    }

    // CHECK EXISTING CLASS
    const [existingClass] = await db.execute(
      'SELECT id_class, id_student FROM student_class WHERE id_class = ? AND id_student = ?',
      [classes, student],
    );
    if (existingClass.length > 0) {
      return res.status(400).json({
        status: 'failed',
        message: 'Student is already assigned to this class',
      });
    }

    // INSERT
    await db.execute(
      'INSERT INTO student_class (id_class, id_student) VALUES (?,?)',
      [classes, student],
    );

    res.json({
      status: 'success',
      message: `${student} has been assigned to ${classes}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = assignStudent;
