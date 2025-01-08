const db = require('../../../db.js');

const insertGrade = async (req, res) => {
  try {
    const studentId = req.query.student_id;
    const classId = req.query.class_id;
    const grade = req.query.grade;
    if (!studentId || !classId || !grade) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please provide student_id, class_id, and grade',
      });
    }

    // INSERT GRADE
    await db.execute(
      'INSERT INTO grade (id_student, id_class, grade) VALUES (?, ?, ?)',
      [studentId, classId, grade],
    );

    res.json({
      status: 'success',
      message: `Grade for student with ID ${studentId} has been inserted!`,
    });
  } catch (error) {}
};

module.exports = insertGrade;
