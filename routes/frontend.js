const express = require('express');
const router = express.Router();
const studentRoutes = require('./frontend/student');
const mentorRoutes = require('./frontend/mentor');
const adminRoutes = require('./frontend/admin');
const { authenticateToken } = require('../middleware/token');

router.use(studentRoutes);
router.use('/mentor', mentorRoutes);
router.use('/admin', adminRoutes);

router.get('/', authenticateToken, (req, res) => {
  res.render('main', {
    title: 'Welcome to the API',
    page: 'pages/home',
    user: req.session.user || {},
  });
});

module.exports = router;
