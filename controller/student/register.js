const db = require('../../db');
const bcrypt = require('bcrypt');
const sanitizeInput = require('../../function/sanitizeInput');

let register = async (req, res) => {
  const sanitizedBody = {};

  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      sanitizedBody[key] = sanitizeInput(req.body[key]);
    }
  }

  try {
    // SANITIZE + INPUT CHECK
    const { email, name, password, city, address, phonenumber } = sanitizedBody;
    if (!email || !name || !password || !phonenumber) {
      return res.status(400).send({ message: 'Data tidak lengkap.' });
    }

    // BCRYPT PASSWORD HASH
    const hashedPassword = await bcrypt.hash(password, 10);

    // FETCH CURRENT SEMESTER
    const [semesterRaw] = await db.execute(
      'SELECT * FROM SEMESTER ORDER BY SEMESTER DESC LIMIT 1',
    );
    const semester = semesterRaw[0].semester;

    // CHECK IF EMAIL HAS BEEN USED
    const [similar] = await db.execute(
      'SELECT email FROM student WHERE EMAIL = ?',
      [email],
    );
    if (similar.length > 0) {
        return res.status(400).send({
            status: 'failed',
            message: 'Email sudah dipakai.'
        });
    }

    // SUFFIX NUMBER AUTO INCREMENT
    const [getId] = await db.execute(
      'SELECT id FROM student ORDER BY id DESC LIMIT 1;',
    );
    if (getId.length > 0) {
      const getIdNumber = getId[0].id.split('-')[1];
      var lastId = parseInt(getIdNumber, 10);
    } else {
      lastId = 0;
    }

    lastId++;

    // PREFIX
    const role = 'S';

    // NEW PRIMARY KEY
    let newId = role + semester + '-' + lastId.toString().padStart(4, '0');

    await db.execute(
      `INSERT INTO student ( id, name, email, password, city, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        newId,
        name,
        email,
        hashedPassword,
        city || null,
        address || null,
        phonenumber,
      ],
    );

    res.status(200).json({
      status: 'success',
      message: 'Akun Berhasil Dibuat!',
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

module.exports = register;
