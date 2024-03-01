const getRole = require('../function/getRole');
const getEmail = require('../function/getEmail')
const db = require('../db');

let user = async (req, res) => {
    try {
        const token = req.cookies['api-auth'];
        const email = getEmail(token);
        const role = getRole(token);

        const [profile] = await db.execute(`SELECT id, name, email, phonenumber, city, address FROM ${role} WHERE email = ?`,
        [email]);

        res.json(
            profile
        );
    } catch (error) {
        res.status(500);
    }
}

module.exports = user;