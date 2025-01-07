const db = require('../../../db');

const getMentor = async (req, res) => {
  try {
    const [mentor] = await db.execute(
      'SELECT id, name, email, phone_number, is_verified FROM mentor ORDER BY id DESC, is_verified ASC',
    );
    res.send(mentor);
  } catch (error) {
    res.status(500);
  }
};

module.exports = getMentor;
