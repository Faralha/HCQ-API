const db = require('../../db');
const sanitizedBody = require('../../function/sanitizeInput');

const queryStudent = async (req, res) => {
  try {
    if (!req.query.name && !req.query.class_id) {
      // QUERIES ALL STUDENT
      try {
        const [result] = await db.execute(
          'SELECT id, name, email, phone_number FROM student',
        );
        return res.json({
          data: result,
          status: 'success',
        });
      } catch (error) {
        return res.status(500);
      }
    }

    // CUSTOM QUERIES FOR CLASS MEMBER FETCH
    else if (req.query.class_id) {
      const [classMember] = await db.execute(
        'SELECT s.id, s.name, s.email, s.phone_number FROM student s LEFT JOIN student_class sc ON s.id = sc.id_student WHERE sc.id_class = ?',
        [req.query.class_id],
      );

      return res.json({
        data: classMember,
        status: 'success',
      });
    }

    // QUERIES STUDENT BY NAME
    else {
      // SANITIZE
      const student = sanitizedBody(req.query.name);

      // Construct the query
      let query = 'SELECT id, name, email, phone_number FROM student';
      const queryParams = [];

      // Add filtering by student name if provided
      if (student) {
        query += ' WHERE name LIKE ?';
        queryParams.push(`%${student}%`);
      }

      // Execute the query
      const [result] = await db.execute(query, queryParams);

      return res.json({ data: result, status: 'success' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = queryStudent;
