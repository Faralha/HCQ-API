const db = require('../../db');

const newAttendance = async (req, res) => {
  try {
    const { classes, student, attend, attend_reason } = req.body;
    await db.execute(
      'INSERT INTO attendance (id_class, id_student, attend, attend_reason) values (?,?,?,?);',
      [classes, student, attend, attend_reason],
    );

    res.json({
      message: `Attendance for ${student} on ${classes} has been recorded!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = newAttendance;
