const isAdminOrMentor = (req, res, next) => {
  if (
    req.session &&
    req.session.user &&
    (req.session.user.role === 'admin' || req.session.user.role === 'mentor')
  ) {
    return next();
  } else {
    return res.redirect('/mentor/login');
  }
};

module.exports = isAdminOrMentor;
