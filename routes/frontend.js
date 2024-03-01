const express = require('express');
const router = express.Router();


router.get('/', require('../_frontend/controller/index'), async (req, res) => {});
router.get('/login', require('../_frontend/controller/login'), async (req, res)=>{});
router.get('/register', require('../_frontend/controller/register'), async(req,res) => {});


module.exports = router;