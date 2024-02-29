const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('../../middleware/token');
const sanitizeInput = require('../../function/sanitizeInput');

const mentorLogin = async (req, res) => {
    try {
        const sanitizedBody = {};

        for (const key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                sanitizedBody[key] = sanitizeInput(req.body[key]);
            }
        }

        const {email, password} = sanitizedBody;


        // VERIFY PASSWORD
        const [emailPass] = await db.execute('SELECT password FROM mentor WHERE email = ?', [email]);
        const passwordMatch = await bcrypt.compare(password, emailPass[0].password);
        if(!passwordMatch){
            return res.status(401);
        }

        const role = 'mentor';
        const token = generateAccessToken({email, role});
        res.cookie(
            "api-auth", token,
            {
                expire: 360000 + Date.now(),
                httpOnly: true,
                secure: true
            }
        );

        res.status(200).json({message: "Authenticated."});
    } catch (error) {
        res.status(500);
    }
}

module.exports = mentorLogin;