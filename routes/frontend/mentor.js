const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', {
    apiLink: '/api/v1/mentor/register',
    title: 'Daftar sebagai Mentor',
    link: '/mentor/register',
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    apiLink: '/api/v1/mentor/login',
    title: 'Masuk sebagai Mentor',
    link: '/mentor/login',
  });
});

router.get('/class', (req, res) => {
  res.render('main', {
    page: 'pages/mentor/class',
    title: 'Class Management',
    user: req.session.user || {},
  });
});

module.exports = router;
