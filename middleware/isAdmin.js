const jwt = require('jsonwebtoken');
require('dotenv').config()

const isAdmin = async (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME
    const token = req.cookies[cookieName];
    const adminToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if(adminToken !== 'undefined'){
        if(adminToken.role === 'admin'){
            next()
        } else {
            res.status(400).json({message: "Unauthorized."});
        }
    } else [
        res.status(400)
    ]
}

module.exports = isAdmin;