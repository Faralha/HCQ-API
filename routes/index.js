const express = require('express');
const app = express();
const router = express.Router();
const db = require('../db');

const isAdmin = require('../middleware/isAdmin');
const {authenticateToken} = require('../middleware/token')

// AUTHENTICATION ROUTES
router.get('/', (req, res) => {
    res.send({message: "This is HCQ REST API. You shouldn't access it directly."});
});

router.post('/register', require('../controller/register'), (req, res) => {
});

router.post('/login', require('../controller/login'), async (req, res) => {
});


// PUBLIC ROUTES (authentication still a must)
router.get('/user', authenticateToken, require('../controller/user'), async (req, res) => {
});

router.get('/region', require('../controller/region.js'), async (req, res) => {
});


// ADMIN ONLY ROUTES
router.post('/admin/login', authenticateToken, require('../controller/admin-login'), async (req, res) => {
})

router.post('/admin/region/create', authenticateToken, isAdmin, require('../controller/createRegion.js'), async (req, res) => {
})

router.post('/admin/region/delete', authenticateToken, isAdmin, require('../controller/deleteRegion.js'), async (req, res) => {
})



module.exports = router;