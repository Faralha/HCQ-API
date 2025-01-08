const express = require('express');
const router = express.Router();
const { isAdmin } = require('../../middleware/isAdmin');
const { getMentorDirect } = require('../../controller/admin/mentor/getMentor');

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

router.get('/class', isAdmin, async (req, res) => {
  res.render('main', {
    page: 'pages/admin/class',
    title: 'Subclass Management',
    user: req.session.user || {},
  });
});

module.exports = router;
