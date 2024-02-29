const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');
const isMentor = require('../middleware/isMentor');
const {authenticateToken} = require('../middleware/token')

// AUTHENTICATION ROUTES
router.get('/', (req, res) => {
    res.send({message: "This is HCQ REST API. You shouldn't access it directly."});
});
router.post('/register', require('../controller/student/register.js'), (req, res) => {});
router.post('/login', require('../controller/student/login.js'), async (req, res) => {});
router.post('/mentor/register', require('../controller/mentor/mentorRegister.js'), async(req, res) => {});
router.post('/mentor/login', require('../controller/mentor/mentorLogin'), async (req, res) =>{});
router.post('/admin/register', require('../controller/admin/adminRegister'), async (req, res)=>{});
router.post('/admin/login', require('../controller/admin/admin-login.js'), async (req, res) => {});


// PUBLIC ROUTES (for Students, authentication is a must)
router.get('/user', authenticateToken, require('../controller/user'), async (req, res) => {});
router.get('/class', authenticateToken, require('../controller/classes/classes.js'), async(req, res) => {});
router.get('/attendance', authenticateToken, require('../controller/classes/attendance/attendance'), async(req,res) => {});
router.post('/attendance/:classes', authenticateToken, require('../controller/classes/attendance/queryAttendance'), async(req,res)=>{});
router.get('/student', authenticateToken, require('../controller/student/queryStudent'), async (req, res) => {});


// ADMIN ONLY ROUTES
router.post('/admin/mentor/verify', authenticateToken, isAdmin, require('../controller/admin/verifyMentor'), async (req, res) => {});
router.post('/admin/class/createSubClass', authenticateToken, isAdmin, require('../controller/admin/createSubclass'), async (req, res) => {})
router.post('/admin/semester/create', authenticateToken, isAdmin, require('../controller/admin/createSemester'), async(req, res) => {});

// MENTOR ONLY ROUTES
router.get('/mentor', authenticateToken, isMentor, async (req, res) => {
    res.json("Hi");
});
router.post('/mentor/class/create', authenticateToken, isMentor, require('../controller/mentor/createClass.js'), async (req, res) => {});
router.post('/mentor/attendance/create', authenticateToken, isMentor, require('../controller/mentor/newAttendance'), async(req,res) => {});
router.post('/mentor/assign/:classes', authenticateToken, isMentor, require('../controller/mentor/assignStudent'), async(req,res)=>{});


module.exports = router;