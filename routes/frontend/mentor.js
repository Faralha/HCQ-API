const express = require('express');
const router = express.Router();

router.get('/class', (req, res) => {
  res.render('main', {
    page: 'pages/mentor/class',
    title: 'Class Management',
    user: req.session.user || {},
  });
});

module.exports = router;
