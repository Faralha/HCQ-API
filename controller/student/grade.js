const db = require('../../../db.js');

const getGrade = async (req, res) => {
  try {
    const studentId = req.session.user.id;
  } catch (error) {
    res.json({
      status: 'failed',
      message: 'Failed to get grade.',
    });
  }
};
