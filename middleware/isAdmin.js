const isAdmin = async (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  } else {
    return res.redirect('/admin/login');
  }
};

module.exports = { isAdmin };
