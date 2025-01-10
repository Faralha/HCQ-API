const db = require('../../../db.js');
const sanitizeInput = require('../../../function/sanitizeInput');

const updateGrade = async (req, res) => {
  try {
    let studentId = req.query.student_id;
    let classId = req.query.class_id;
    let grade = req.query.grade;
    if (!studentId || !classId || !grade) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please fill in all required fields.',
      });
    }

    // SANITIZE INPUT
    studentId = sanitizeInput(studentId);
    classId = sanitizeInput(classId);
    grade = sanitizeInput(grade);

    // REMOVE GRADE
    await db.execute(
      'UPDATE grade SET grade = ? WHERE id_student = ? AND id_class = ?',
      [grade, studentId, classId],
    );

    res.json({
      status: 'success',
      message: `Grade for student with ID ${studentId} has been updated!`,
    });
  } catch (error) {
    res.json({
      status: 'failed',
      message: 'Failed to update grade.',
    });
  }
};

module.exports = updateGrade;
