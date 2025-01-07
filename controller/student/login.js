const db = require('../../db');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../../middleware/token');
const sanitizeInput = require('../../function/sanitizeInput');

let login = async (req, res) => {
  // SANITIZE INPUT
  const sanitizedBody = {};

  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      sanitizedBody[key] = sanitizeInput(req.body[key]);
    }
  }

  const { email, password } = sanitizedBody;

  try {
    // CHECK IF THERE IS ANY EMAIL REGISTERED
    const checkEmail = await db.execute(
      'SELECT email FROM student WHERE email = ?',
      [email],
    );
    if (checkEmail.length <= 0) {
      return res.status(401).json({ error: 'Access Forbidden.' });
    }

    // CHECK IF PASSWORD MATCH
    const [emailPass] = await db.execute(
      'SELECT password FROM student WHERE email = ?',
      [email],
    );
    const passwordMatch = await bcrypt.compare(password, emailPass[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Access Forbidden.' });
    }

    // ROLE - by default role will be student
    const role = 'student';

    require('dotenv').config();
    const cookieName = process.env.COOKIE_NAME;

    const token = generateAccessToken({ email, role });
    res.cookie(cookieName, token, {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    });

    res.json({ message: 'Authenticated.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error!' });
  }
};

module.exports = login;
