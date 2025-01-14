const db = require('../../db');

const fetchClassDetails = async (req, res) => {
  try {
    const classId = req.params.id;
    const [data] = await db.execute(
      `
      SELECT 
        class.id AS class_id,
        class.jenis AS class_jenis,
        class.semester AS class_semester,
        mentor.name AS mentor_name,
        student.id AS student_id,
        student.name AS student_name,
        student.email AS student_email,
        student.phone_number AS student_phone_number,
        grade.grade AS student_grade
      FROM 
        class
      JOIN 
        mentor ON class.mentor = mentor.id
      JOIN 
        student_class ON class.id = student_class.id_class
      JOIN 
        student ON student_class.id_student = student.id
      LEFT JOIN 
        grade ON class.id = grade.id_class AND student.id = grade.id_student
      WHERE 
        class.id = ?
      `,
      [classId],
    );
    res.json(data);
  } catch (error) {
    res.status(500);
  }
};

module.exports = fetchClassDetails;
