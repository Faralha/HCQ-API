const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db');

const isMentor = async (req, res, next) => {
    const token = req.cookies['api-auth'];
    const mentorToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const [verified] = await db.execute('SELECT isVerified FROM mentor WHERE email = ?', [mentorToken.email]);
    if(verified[0].isVerified === 0){
        return res.status(401).send({alert : "Your account hasn't been verified. Contact admin for more info."});
    }

    if(mentorToken !== 'undefined'){
        if(mentorToken.role === 'mentor'){
            next()
        }
    }
    res.status(400);
}

module.exports = isMentor;