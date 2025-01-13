const db = require('../../../db');

const verifyMentor = async (req, res) => {
  try {
    const { id } = req.body;
    const [similar] = await db.execute(
      'SELECT is_verified FROM mentor WHERE id = ?',
      [id],
    );

    if (similar[0].isVerified === 1) {
      return res.send({ alert: 'Mentor already verified.' });
    }

    await db.execute('UPDATE mentor SET is_verified = 1 WHERE id = ?', [id]);
    res.send({
      status: 'success',
      message: 'Successfully verified mentor!',
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = verifyMentor;
