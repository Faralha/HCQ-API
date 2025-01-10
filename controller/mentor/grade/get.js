const db = require('../../../db.js');

const getGrade = async (req, res) => {
  try {
    const mentorId = req.session.user.id;

    const [classes] = await db.execute(
      `
      SELECT 
        s.id AS id_student, 
        c.semester, 
        g.grade, 
        c.id AS id_class, 
        s.name AS student_name 
      FROM 
        class c
      JOIN 
        student_class sc ON c.id = sc.id_class
      LEFT JOIN 
        grade g ON sc.id_class = g.id_class AND sc.id_student = g.id_student
      JOIN 
        student s ON sc.id_student = s.id 
      WHERE 
        c.mentor = ?
      `,
      [mentorId],
    );

    res.json({
      status: 'success',
      data: classes,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'failed',
      message: 'Failed to get grade.',
    });
  }
};

module.exports = getGrade;
