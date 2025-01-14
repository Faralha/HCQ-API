const db = require('../../../db');

const assignStudent = async (req, res) => {
  try {
    // RETRIEVE DATA
    const { class_id, student_ids } = req.body;
    if (!class_id || !student_ids || !Array.isArray(student_ids)) {
      return res.status(400).json({
        message: 'Please provide class and an array of student IDs',
      });
    }

    // Iterate over each student ID
    for (const student of student_ids) {
      // CHECK EXISTING CLASS
      const [existingClass] = await db.execute(
        'SELECT id_class, id_student FROM student_class WHERE id_class = ? AND id_student = ?',
        [class_id, student],
      );
      if (existingClass.length > 0) {
        return res.status(400).json({
          status: 'failed',
          message: `Student ${student} is already assigned to this class`,
        });
      }

      // INSERT
      await db.execute(
        'INSERT INTO student_class (id_class, id_student) VALUES (?,?)',
        [class_id, student],
      );
    }

    res.status(200).json({
      status: 'success',
      message: 'Students assigned to class successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

module.exports = assignStudent;
