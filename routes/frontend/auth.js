const express = require('express');
const router = express.Router();

router.get('/admin/register', (req, res) => {
  res.render('adminRegister', {
    apiLink: '/api/v1/admin/register',
    title: 'Daftar sebagai Admin',
    link: '/admin/register',
  });
});

router.get('/admin/login', (req, res) => {
  res.render('adminLogin', {
    apiLink: '/api/v1/admin/login',
    title: 'Masuk sebagai Admin',
    link: '/admin/login',
  });
});

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
