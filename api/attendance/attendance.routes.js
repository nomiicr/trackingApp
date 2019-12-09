const express = require('express');
const router = express.Router();
const attendanceController = require('./attendance.controller')
const { check } = require('express-validator/check');

router.post('/markAttendance', attendanceController.markAttendance)
router.post('/createBulk', attendanceController.bulkAttendance)

router.get('/getAttendanceByDate', attendanceController.getAttendanceByDate)
router.get('/getAttendance', attendanceController.getAttendance)

module.exports = router;