const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT VERIFICATION MIDDLEWARE
const verifyToken = (token, callback, res) => {
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, authData) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, authData);
    }
  });
};

const authenticateToken = async (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, {
    expiresIn: '3h',
  });
}

module.exports = { verifyToken, authenticateToken, generateAccessToken };
