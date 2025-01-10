const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../middleware/token');
const sanitizeInput = require('../../function/sanitizeInput');

const mentorLogin = async (req, res) => {
  try {
    const sanitizedBody = {};

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        sanitizedBody[key] = sanitizeInput(req.body[key]);
      }
    }

    const { email, password } = sanitizedBody;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Data tidak lengkap.' });
    }

    // VERIFY PASSWORD
    const [emailPass] = await db.execute(
      'SELECT password, id FROM mentor WHERE email = ?',
      [email],
    );

    if (emailPass.length === 0) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Access Forbidden.' });
    }

    const passwordMatch = await bcrypt.compare(password, emailPass[0].password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Password Salah.' });
    }

    const role = 'mentor';
    req.session.user = {
      email: email,
      role: role,
      id: emailPass[0].id,
    };

    res.json({ status: 'success', message: 'Authenticated.' });
  } catch (error) {
    res.status(500);
  }
};

module.exports = mentorLogin;
