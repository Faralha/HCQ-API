const express = require('express');
const router = express.Router();
const studentRoutes = require('./frontend/student');
const mentorRoutes = require('./frontend/mentor');
const adminRoutes = require('./frontend/admin');
const authRoutes = require('./frontend/auth');
const { authenticateToken } = require('../middleware/token');
const { isAdmin } = require('../middleware/isAdmin');
const isMentor = require('../middleware/isMentor');

router.use(authRoutes);
router.use(authenticateToken, studentRoutes);
router.use('/mentor', isMentor, mentorRoutes);
router.use('/admin', isAdmin, adminRoutes);

router.get('/', authenticateToken, (req, res) => {
  res.render('main', {
    title: 'Welcome to the API',
    page: 'pages/home',
    user: req.session.user || {},
  });
});

module.exports = router;
