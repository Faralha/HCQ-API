const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin.js');
const isMentor = require('../middleware/isMentor.js');
const {authenticateToken} = require('../middleware/token.js')

router.post('/cookie', require('../controller/_test/giveCookie'), async (req, res) =>{});

// AUTHENTICATION ROUTES
router.post('/register', require('../controller/student/register.js'), (req, res) => {});
router.post('/login', require('../controller/student/login.js'), async (req, res) => {});
router.post('/mentor/register', require('../controller/mentor/mentorRegister.js'), async(req, res) => {});
router.post('/mentor/login', require('../controller/mentor/mentorLogin.js'), async (req, res) =>{});
router.post('/admin/register', require('../controller/admin/adminRegister.js'), async (req, res)=>{});
router.post('/admin/login', require('../controller/admin/admin-login.js'), async (req, res) => {});


// PUBLIC ROUTES (for Students, authentication is a must)
router.get('/user', authenticateToken, require('../controller/user.js'), async (req, res) => {});
router.get('/class', authenticateToken, require('../controller/classes/classes.js'), async(req, res) => {});
router.get('/attendance', authenticateToken, require('../controller/classes/attendance/attendance.js'), async(req,res) => {});
router.post('/attendance/:classes', authenticateToken, require('../controller/classes/attendance/queryAttendance.js'), async(req,res)=>{});
router.get('/student', authenticateToken, require('../controller/student/queryStudent.js'), async (req, res) => {});
router.get('/student/class', authenticateToken, require('../controller/student/queryClass.js'), async(req,res)=>{});


// ADMIN ONLY ROUTES
router.post('/admin/mentor/verify', authenticateToken, isAdmin, require('../controller/admin/verifyMentor.js'), async (req, res) => {});
router.post('/admin/class/createSubClass', authenticateToken, isAdmin, require('../controller/admin/createSubclass.js'), async (req, res) => {})
router.post('/admin/semester/create', authenticateToken, isAdmin, require('../controller/admin/createSemester.js'), async(req, res) => {});

// MENTOR ONLY ROUTES
router.get('/mentor', authenticateToken, isMentor, async (req, res) => {
    res.json("Hi");
});
router.post('/mentor/class/create', authenticateToken, isMentor, require('../controller/mentor/createClass.js'), async (req, res) => {});
router.post('/mentor/attendance/create', authenticateToken, isMentor, require('../controller/mentor/newAttendance.js'), async(req,res) => {});
router.post('/mentor/assign/:classes', authenticateToken, isMentor, require('../controller/mentor/assignStudent.js'), async(req,res)=>{});


module.exports = router;