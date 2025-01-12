const express = require('express');
const router = express.Router();

const {isAdmin} = require('../../middleware/isAdmin');
const isMentor = require('../../middleware/isMentor');
const { authenticateToken } = require('../../middleware/token');
const isAdminOrMentor = require('../../middleware/isAdminorMentor');

// AUTHENTICATION ROUTES
router.post('/register', require('../../controller/student/register.js'), (req, res) => {});
router.post('/login', require('../../controller/student/login.js'), async (req, res) => {});
router.post('/mentor/register', require('../../controller/mentor/mentorRegister.js'), async(req, res) => {});
router.post('/mentor/login', require('../../controller/mentor/mentorLogin'), async (req, res) =>{});
router.post('/admin/register', require('../../controller/admin/auth/adminRegister.js'), async (req, res)=>{});
router.post('/admin/login', require('../../controller/admin/auth/adminLogin.js'), async (req, res) => {});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Error logging out");
    res.status(200).send("Logged out");
    })
})
router.get('/token', require('../../controller/checkAuth'), async (req, res) => {});

// PUBLIC ROUTES (for Students, authentication is a must)
router.get('/user', authenticateToken, require('../../controller/user'), async (req, res) => {});
router.get('/class', authenticateToken, require('../../controller/classes/classes.js'), async(req, res) => {});
router.delete('/class', authenticateToken, isAdminOrMentor, require('../../controller/mentor/classDetails/removeStudent'), async (req, res) => { });
router.get('/attendance', authenticateToken, require('../../controller/classes/attendance/attendance'), async (req, res) => { });
router.post('/attendance/:classes', authenticateToken, require('../../controller/classes/attendance/queryAttendance'), async(req,res)=>{});

router.get('/student', authenticateToken, isAdminOrMentor, require('../../controller/student/queryStudent'), async (req, res) => { });
router.get('/student/class', authenticateToken, require('../../controller/student/queryClass'), async(req,res)=>{});
router.get('/checkAuth', authenticateToken, require('../../controller/checkAuth'), async(req, res)=>{});

router.get('/grade', authenticateToken, require('../../controller/student/grade'), async (req, res) => { });

// ADMIN ONLY ROUTES
router.get('/mentors', authenticateToken, isAdmin, require('../../controller/admin/mentor/getMentor'), async (req, res) => { });
router.post('/admin/mentor/verify', authenticateToken, isAdmin, require('../../controller/admin/mentor/verifyMentor'), async (req, res) => {});
router.get('/admin/class', authenticateToken, isAdmin, require('../../controller/admin/subclass/fetchSubclass.js'), async(req, res)=>{});
router.post('/admin/class', authenticateToken, isAdmin, require('../../controller/admin/subclass/createSubclass.js'), async (req, res) => {})
router.delete('/admin/class/:id', isAdmin, require('../../controller/admin/subclass/deleteSubclass.js'), async (req, res) => {})
router.post('/admin/semester/create', authenticateToken, isAdmin, require('../../controller/admin/semester/createSemester'), async(req, res) => {});

// MENTOR ONLY ROUTES
// router.get('/mentor', authenticateToken, isMentor, async (req, res) => {
//     res.json("Hi");
// });
router.post('/mentor/create/attendance', authenticateToken, isMentor, require('../../controller/mentor/newAttendance'), async(req,res) => {});
router.post('/mentor/class', authenticateToken, isMentor, require('../../controller/mentor/class/createClass.js'), async (req, res) => {});
router.delete('/mentor/class/:id', authenticateToken, isMentor, require('../../controller/mentor/class/deleteClass.js'), async (req, res) => {});
router.get('/mentor/class', authenticateToken, isMentor, require('../../controller/mentor/class/fetchClass.js'), async (req, res) => {});
router.get('/mentor/jenis/', authenticateToken, isMentor, require('../../controller/mentor/class/fetchJenis.js'), async(req,res)=>{});
router.post('/mentor/class/assign', authenticateToken, isMentor, require('../../controller/mentor/classDetails/assignStudent'), async(req,res)=>{});

router.get('/mentor/grade', authenticateToken, isMentor, require('../../controller/mentor/grade/get'), async (req, res) => { });
router.post('/mentor/grade', authenticateToken, isMentor, require('../../controller/mentor/grade/insert'), async (req, res) => { });
router.put('/mentor/grade', authenticateToken, isMentor, require('../../controller/mentor/grade/update'), async (req, res) => { });
router.delete('/mentor/grade', authenticateToken, isMentor, require('../../controller/mentor/grade/delete'), async (req, res) => { });

module.exports = router;