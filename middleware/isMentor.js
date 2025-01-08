require('dotenv').config();
const db = require('../db');

const isMentor = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect('/mentor/login');
    }
    const email = req.session.user.email;

    const [verified] = await db.execute(
      'SELECT is_verified FROM mentor WHERE email = ?',
      [email],
    );
    if (verified[0].is_verified === 0) {
      return res.status(401).send({
        message:
          "Your account hasn't been verified. Contact admin for more info.",
      });
    } else if (verified[0].is_verified === 1) {
      return next();
    } else {
      return res.redirect('/mentor/login');
    }
  } catch (error) {
    res.status(500);
  }
};

module.exports = isMentor;
