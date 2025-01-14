const db = require('../../../db.js');
const sanitizeInput = require('../../../function/sanitizeInput');

const insertGrade = async (req, res) => {
  try {
    const studentId = req.body.id_student;
    const classId = req.body.id_class;
    const grade = req.body.grade;

    if (!studentId || !classId) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please fill in all required fields.',
      });
    }

    // // SANITIZE INPUT
    // studentId = sanitizeInput(studentId);
    // classId = sanitizeInput(classId);
    // grade = sanitizeInput(grade);

    console.log(studentId, classId, grade);

    // INSERT GRADE
    await db.execute(
      `
      INSERT INTO grade (id_student, id_class, grade) 
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE grade = VALUES(grade);
      `,
      [studentId, classId, grade],
    );

    res.json({
      status: 'success',
      message: `Grade for student with ID ${studentId} has been inserted!`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'failed',
      message: 'Failed to insert grade.',
    });
  }
};

module.exports = insertGrade;
