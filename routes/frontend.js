const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');
const isMentor = require('../middleware/isMentor');
const {authenticateToken} = require('../middleware/token');



module.exports = router;