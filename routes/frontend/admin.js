const express = require('express');
const router = express.Router();
const { isAdmin } = require('../../middleware/isAdmin');
const { getMentorDirect } = require('../../controller/admin/mentor/getMentor');
const verifyMentor = require('../../controller/admin/mentor/verifyMentor');

router.get('/register', (req, res) => {
  res.render('adminRegister', {
    apiLink: '/api/v1/admin/register',
    title: 'Daftar sebagai Admin',
    link: '/admin/register',
  });
});

router.get('/login', (req, res) => {
  res.render('adminLogin', {
    apiLink: '/api/v1/admin/login',
    title: 'Masuk sebagai Admin',
    link: '/admin/login',
  });
});

router.get('/mentor', isAdmin, async (req, res) => {
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
    res.status(500).send('Internal Server Error');
  }
});

router.post('/mentor/verify', verifyMentor);

module.exports = router;
