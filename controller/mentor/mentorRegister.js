const db = require('../../db.js');
const bcrypt = require('bcrypt');
const sanitizeInput = require('../../function/sanitizeInput');

let mentorRegister = async (req, res) => {
  try {
    console.log('masuk');
    const sanitizedBody = {};

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        sanitizedBody[key] = sanitizeInput(req.body[key]);
      }
    }

    const { email, name, password, phonenumber, address, city } = sanitizedBody;

    // FETCH CURRENT SEMESTER
    const [semesterRaw] = await db.execute(
      'SELECT * FROM SEMESTER ORDER BY SEMESTER DESC LIMIT 1',
    );
    const semester = semesterRaw[0].semester;

    // EMAIL CHECKER
    const [similar] = await db.execute('SELECT * FROM mentor WHERE email = ?', [
      email,
    ]);
    if (similar.length > 0) {
      return res.json({ status: 'failed', message: 'Email has been used!' });
    }

    // ID HANDLER
    const [idQuery] = await db.execute(
      'SELECT id FROM mentor ORDER BY id DESC LIMIT 1',
    );
    var id = 1;
    if (idQuery.length > 0) {
      const getIdNumber = idQuery[0].id.split('-')[1];
      id = parseInt(getIdNumber, 10);
      id++;
    }

    // PASSWORD HASH
    const hashedPassword = await bcrypt.hash(password, 10);

    const role = 'M';
    const newId = role + semester + '-' + id.toString().padStart(4, '0');
    await db.execute(
      'INSERT INTO mentor (id, name, email, password, phone_number, city, address) VALUES (?,?,?,?,?,?,?)',
      [
        newId,
        name,
        email,
        hashedPassword,
        phonenumber,
        city || null,
        address || null,
      ],
    );

    res.status(200).json({
      status: 'success',
      message:
        'Mentor Account has been created! Wait for verification by Admin.',
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = mentorRegister;
