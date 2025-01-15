const db = require('../../../db');

const getTuition = async (req, res) => {
  try {
    const [data] = await db.execute(`
    SELECT 
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
    RIGHT JOIN 
      student s ON t.id_student = s.id
    `);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = getTuition;
