const express = require('express');
const router = express.Router();

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

module.exports = router;
