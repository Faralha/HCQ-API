const db = require('../../db');

const getGrade = async (req, res) => {
  try {
    const studentId = req.session.user.id;

    const [grade] = await db.execute(
      `
      SELECT 
      g.grade, 
      g.id_class, 
      c.semester 
      FROM 
        grade g
      JOIN 
        class c ON g.id_class = c.id
      WHERE 
        g.id_student = ?
      `,
      [studentId],
    );

    res.json({
      status: 'success',
      data: grade,
    });

  } catch (error) {
    res.json({
      status: 'failed',
      message: 'Failed to get grade.',
    });
  }
};

module.exports = getGrade;