const db = require('../../db');

const fetchClass = async (req, res) => {
  try {
    const mentor_id = req.session.user.id;
    const [data] = await db.execute(
      `
    SELECT 
      class.id AS class_id,
      class.jenis AS class_jenis,
      class.semester AS semester,
      mentor.name AS mentor_name
    FROM 
      class
    JOIN 
      mentor ON class.mentor = mentor.id
    WHERE 
      mentor.id = ?
    `,
      [mentor_id],
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = fetchClass;
