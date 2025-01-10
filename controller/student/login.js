const db = require('../../db');
const bcrypt = require('bcrypt');

const sanitizeInput = require('../../function/sanitizeInput');

let login = async (req, res) => {
  // SANITIZE INPUT
  const sanitizedBody = {};

  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      sanitizedBody[key] = sanitizeInput(req.body[key]);
    }
  }

  try {
    // INPUT VALIDATION
    const { email, password } = sanitizedBody;
    if (!email || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Data tidak lengkap.',
      });
    }

    // CHECK IF PASSWORD MATCH
    const [emailPass] = await db.execute(
      'SELECT password FROM student WHERE email = ?',
      [email],
    );

    if (emailPass.length === 0) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access Forbidden.',
      });
    }

    const passwordMatch = await bcrypt.compare(password, emailPass[0].password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: 'failed',
        message: 'Access Forbidden.',
      });
    }

    // ROLE - by default role will be student
    const role = 'student';

    const [id] = await db.execute('SELECT id FROM student WHERE email = ?', [
      email,
    ]);

    req.session.user = {
      email: email,
      role: role,
      id: id[0].id,
    };

    res.status(200).json({
      status: 'success',
      message: 'Authenticated.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

module.exports = login;
