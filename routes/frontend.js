const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/token');
const { getMentorDirect } = require('../controller/admin/mentor/getMentor');

// STUDENT
router.get('/register', (req, res) => {
  res.render('register', {
    apiLink: '/api/v1/register',
    title: 'Daftar sebagai Siswa',
    link: '/register',
  });
});
router.get('/login', (req, res) => {
  res.render('login', {
    apiLink: '/api/v1/login',
    title: 'Masuk sebagai Siswa',
    link: '/login',
  });
});

// MENTOR
router.get('/mentor/register', (req, res) => {
  res.render('register', {
    apiLink: '/api/v1/mentor/register',
    title: 'Daftar sebagai Mentor',
    link: '/mentor/register',
  });
});
router.get('/mentor/login', (req, res) => {
  res.render('login', {
    apiLink: '/api/v1/mentor/login',
    title: 'Masuk sebagai Mentor',
    link: '/mentor/login',
  });
});

// ADMIN
// AUTH
router.get('/admin/register', (req, res) => {
  res.render('adminRegister', {
    link: '/api/v1/admin/register',
    title: 'Daftar sebagai Admin',
  });
});
router.get('/admin/login', (req, res) => {
  res.render('adminLogin', {
    link: '/api/v1/admin/login',
    title: 'Masuk sebagai Admin',
  });
});
// MENTOR VERIFICATION
router.get('/admin/mentor', async (req, res) => {
  try {
    const mentors = await getMentorDirect();
    res.render('main', {
      page: 'pages/admin/verifyMentor',
      link: '/admin/mentor/verify',
      title: 'Verifikasi Mentor',
      mentors: mentors,
      user: req.session.user || {},
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

router.get('/', authenticateToken, (req, res) => {
  res.render('main', {
    title: 'Welcome to the API',
    page: 'pages/home',
    user: req.session.user || {},
  });
});

module.exports = router;
