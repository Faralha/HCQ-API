const db = require('../../../db');

const removeStudent = async (req, res) => {
  try {
    const studentId = req.query.student_id;
    const classId = req.query.class_id;
    if (!studentId || !classId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please provide student_id and class_id',
      });
    }

    // REMOVE STUDENT
    await db.execute(
      'DELETE FROM student_class WHERE id_student = ? AND id_class = ?',
      [studentId, classId],
    );

    res.json({
      status: 'success',
      message: `Student with ID ${studentId} has been removed!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = removeStudent;
