var express = require('express');
var router = express.Router();
var meetingController = require('./meeting.controller')
const { check } = require('express-validator/check');




router.post('/',meetingController.create)
// router.post('/createBulk',meetingController.createBulk)

router.get('/getAll',meetingController.getAllMobile)
router.get('/',meetingController.getAll)
router.post('/createBulks',meetingController.createBulks)

module.exports = router;