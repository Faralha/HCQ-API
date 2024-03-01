const jwt = require('jsonwebtoken');
require('dotenv').config();

const getRole = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET).role;
}

module.exports = getRole;