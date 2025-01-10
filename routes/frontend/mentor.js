const express = require('express');
const router = express.Router();

router.get('/class', (req, res) => {
  res.render('main', {
    page: 'pages/mentor/class',
    title: 'Class Management',
    user: req.session.user || {},
  });
});

router.get('/class/:id', (req, res) => {
  res.render('main', {
    page: 'pages/mentor/classDetail',
    title: 'Class Detail',
    user: req.session.user || {},
    id: req.params.id,
  });
});

router.get('/grade', (req, res) => {
  res.render('main', {
    page: 'pages/mentor/grade',
    title: 'Grade Management',
    user: req.session.user || {},
  });
});

module.exports = router;
