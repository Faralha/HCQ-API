const jwt = require('jsonwebtoken');
require('dotenv').config();


// JWT VERIFICATION MIDDLEWARE
const verifyToken = (token, callback) => {
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, authData) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, authData);
      }
    });
  };

const authenticateToken = (req, res, next) => {
    const bearerHeader = req.cookies['api-auth'];
  
    if (bearerHeader !== 'undefined') {
      verifyToken(bearerHeader, (err, authData) => {
        if (err) {
          res.status(403).json({message: err}); // Unauthorized
        } else {
          req.authData = authData;
          next(); // Lanjut ke handler berikutnya
        }
      });
    } else {
      res.status(403).json({message: "error"}); // Unauthorized
    }
  };


  function generateAccessToken(email){
    return jwt.sign((email), process.env.TOKEN_SECRET, {
      expiresIn: '3h'
    });
}

  module.exports = {verifyToken, authenticateToken, generateAccessToken}