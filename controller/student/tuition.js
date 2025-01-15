const db = require('../../db');

const getTuition = async (req, res) => {
  try {
    const student_id = req.session.user.id;

    if (!student_id) {
      return res.json({
        alert: 'Student ID Needed!',
      });
    }
    const [data] = await db.execute(
      `
      SELECT 
        t.id AS tuition_id,
        t.amount,
        t.semester,
        t.paid,
        t.last_paid,
        s.id AS student_id,
        s.name AS student_name,
        s.email AS student_email,
        s.phone_number AS student_phone_number
      FROM 
        tuition t
      JOIN 
        student s ON t.id_student = s.id
      WHERE s.id = ?
    `,
      [student_id],
    );

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};

module.exports = getTuition;
