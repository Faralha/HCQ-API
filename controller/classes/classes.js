const db = require('../../db');
const getEmail = require('../../function/getEmail');
require('dotenv').config();

const classes = async (req, res) => {
    try {
        const cookieName = process.env.COOKIE_NAME;
        const token = await req.cookies[cookieName];
        const email = getEmail(token);
        const [kelas] = await db.execute('SELECT c.id, c.mentor, c.semester FROM class C JOIN student_class sc ON sc.id_class = c.id JOIN student s ON sc.id_student = s.id WHERE s.email = ?',
        [email]);
        res.send(kelas);
        console.log(email);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error: ' + error);
    }
}

module.exports = classes;