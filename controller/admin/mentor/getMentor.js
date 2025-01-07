const db = require('../../../db');

const getMentor = async (req, res) => {
  try {
    const [mentor] = await db.execute(
      'SELECT id, name, email, is_verified FROM mentor',
    );
    res.send(mentor);
  } catch (error) {
    res.status(500);
  }
};

const getMentorDirect = async () => {
  try {
    const [mentors] = await db.execute(
      'SELECT id, name, email, is_verified FROM mentor',
    );
    return mentors;
  } catch (error) {
    console.error(error);
    throw new Error('Database query failed');
  }
};

module.exports = { getMentor, getMentorDirect };
