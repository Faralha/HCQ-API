const isAdmin = async (req, res, next) => {
  try {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
      return next();
    } else {
      return res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAdmin };
