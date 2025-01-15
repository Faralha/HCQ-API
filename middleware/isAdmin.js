const isAdmin = async (req, res, next) => {
  try {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
      return next();
    } else {
      return res.status(401).json({ message: 'Access Forbidden.' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAdmin };
