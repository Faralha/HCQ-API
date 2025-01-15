const db = require('../../../db');

const addTuition = async (req, res) => {
  try {
    let { student_id, amount, paid, semester } = req.body;
    console.log(req.body);

    if (!student_id || !amount) {
      return res.json({
        alert: 'Please fill all fields!',
      });
    }

    if (!semester) {
      const [currentSemester] = await db.execute(
        'SELECT semester FROM semester ORDER BY semester DESC;',
      );
      semester = currentSemester[0].semester;
    }

    if (!paid) paid = false;
    const lastPaid = new Date();
    await db.execute(
      `
      INSERT INTO tuition (id_student, amount, paid, semester, last_paid)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE amount = VALUES(amount), paid = VALUES(paid), semester = VALUES(semester), last_paid = VALUES(last_paid);
      `,
      [student_id, amount, paid, semester, lastPaid],
    );

    return res.json({
      alert: 'Tuition added!',
    });
  } catch (error) {
    res.status(500).json('server error');
    console.log(error);
  }
};

module.exports = addTuition;
