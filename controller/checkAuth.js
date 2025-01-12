require('dotenv').config();

const checkAuth = (req, res) => {
  try {
    if(req.session.user) {
      return res.status(200).json('Authenticated.');
    } else {
      return res.status(401).json('Unauthorized.');
    }

  } catch (error) {
    res.status(500);
  }
};

module.exports = checkAuth;
