const db = require('../../../db');
const sanitizeInput = require('../../../function/sanitizeInput');

const bcrypt = require('bcrypt');

let adminLogin = async (req, res) => {
  try {
    const sanitizedBody = {};

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        sanitizedBody[key] = sanitizeInput(req.body[key]);
      }
    }

    const { email, password } = sanitizedBody;
    // CHECK IF PASSWORD MATCH
    const [emailPass] = await db.execute(
      'SELECT password, id FROM admin WHERE email = ?',
      [email],
    );

    if (emailPass.length === 0) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Access Forbidden.' });
    }

    const passwordMatch = await bcrypt.compare(password, emailPass[0].password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access Forbidden.',
      });
    }

    const role = 'admin';
    req.session.user = {
      email: email,
      role: role,
      id: emailPass[0].id,
    };

    res.status(200).json({ status: 'success', message: 'Authenticated.' });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

module.exports = adminLogin;
