const db = require('../../db');
const sanitizeInput = require('../../function/sanitizeInput');
const bcrypt = require('bcrypt');

const adminRegister = async (req, res) => {
    try {
        const sanitizedBody = {};

        for (const key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                sanitizedBody[key] = sanitizeInput(req.body[key]);
            }
        }

        const {email, password, token, name, city, address, phonenumber} = sanitizedBody;


        // VERIFY TOKEN
        if(!token){
            res.status(401).json({alert: "Invalid Token."});
        }
        const [verifyToken] = await db.execute('SELECT token FROM token WHERE token = ? AND email = ?',
        [token, email]);
        if(verifyToken.length <= 0){
            return res.status(401).json({alert : "Invalid Token."});
        };

        // DELETE USED TOKEN
        await db.execute('DELETE FROM token WHERE token = ? AND email = ?',
        [token, email]);

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // FETCH LAST ID
        var lastId = 0;
        const [lastIdRaw] = await db.execute('SELECT id FROM admin ORDER BY id DESC LIMIT 1');
        if(lastIdRaw.length > 0){
            lastId = lastIdRaw[0].id;
        }

        lastId++;

        const role = 'A';

        // INSERT
        const newId = role + '-' + lastId;
        await db.execute('INSERT INTO admin (id, name, email, password, city, address, phonenumber) VALUES (?,?,?,?,?,?,?)',
        [newId, name, email, hashedPassword, city || null, address || null, phonenumber]);

        res.json({
            message: "Admin Account Created! Please Login."
        });

    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = adminRegister;