const db = require('../../db');

const getGrade = async (req, res) => {
  try {
    const studentId = req.session.user.id;

    const [grade] = await db.execute(
      `
      SELECT 
        g.grade, 
        g.id_class, 
        c.semester,
        j.jenis
      FROM 
        grade g
      JOIN 
        class c ON g.id_class = c.id
      JOIN 
        jenis j ON c.jenis = j.jenis
      WHERE 
        g.id_student = ?
      `,
      [studentId],
    );

    res.json(grade);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getGrade;
