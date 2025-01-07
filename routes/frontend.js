const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/token');

// STUDENT
router.get('/register', (req, res) => {
  res.render('register', { link: '/register', title: 'Daftar sebagai Siswa' });
});
router.get('/login', (req, res) => {
  res.render('login', { link: '/login', title: 'Masuk sebagai Siswa' });
});

// MENTOR
router.get('/mentor/register', (req, res) => {
  res.render('register', {
    link: '/mentor/register',
    title: 'Daftar sebagai Mentor',
  });
});
router.get('/mentor/login', (req, res) => {
  res.render('login', { link: '/mentor/login', title: 'Masuk sebagai Mentor' });
});

router.get('/', authenticateToken, (req, res) => {
  res.render('main', {
    title: 'Welcome to the API',
    page: 'pages/home',
    user: req.session.user || {},
  });
});

module.exports = router;
