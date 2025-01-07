const jwt = require('jsonwebtoken');
require('dotenv').config();

const getEmail = (token) => {
  const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  return verifiedToken.email;
};

module.exports = getEmail;
