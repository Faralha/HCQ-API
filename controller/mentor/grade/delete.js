const db = require('../../../db.js');
const sanitizeInput = require('../../../function/sanitizeInput.js');

const removeGrade = async (req, res) => {
  try {
    let studentId = req.query.student_id;
    let classId = req.query.class_id;

    if (!studentId || !classId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please fill in all required fields.',
      });
    }

    // SANITIZE INPUT
    studentId = sanitizeInput(studentId);
    classId = sanitizeInput(classId);

    // REMOVE GRADE
    await db.execute(
      'DELETE FROM grade WHERE id_student = ? AND id_class = ?',
      [studentId, classId],
    );

    res.json({
      status: 'success',
      message: `Grade for student with ID ${studentId} has been removed!`,
    });
  } catch (error) {
    res.json({
      status: 'failed',
      message: 'Failed to remove grade.',
    });
  }
};

module.exports = removeGrade;
