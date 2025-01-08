const db = require('../../../db');

const fetchClass = async (req, res) => {
  try {
    const email = req.session.user.email;
    const [idMentor] = await db.execute(
      'SELECT id FROM mentor WHERE email = ?',
      [email],
    );

    const [data] = await db.execute('SELECT * FROM class where mentor = ?', [
      idMentor[0].id,
    ]);
    res.json({ data, status: 'success' });
  } catch (error) {
    res.status(500);
  }
};

module.exports = fetchClass;
