const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieName = process.env.COOKIE_NAME

const checkAuth = (req, res) => {
    try {
        const token = req.cookies[cookieName];
        if(!token){
            return res.status(401);
        }

        res.status(200).json("Authenticated.");

    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = checkAuth