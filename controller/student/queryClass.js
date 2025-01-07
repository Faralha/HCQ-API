const db = require('../../db');
const sanitizeInput = require('../../function/sanitizeInput');

const queryClass = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.json({
        alert: 'Email Needed!',
      });
    }

    const email = sanitizeInput(req.body.email);

    const [result] = await db.execute(
      'SELECT c.id, c.jenis, c.mentor FROM class c JOIN student_class sc ON c.id = sc.id_class JOIN student s ON s.id = sc.id_student WHERE s.email = ?;',
      [email],
    );

    res.json({
      classes: result,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = queryClass;
