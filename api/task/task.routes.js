const express = require('express');
const router = express.Router();
const taskController = require('./task.controller')
const { check } = require('express-validator/check');


router.get('/viewRiderTask',taskController.viewEmployeeTask)
router.get('/userTasks',taskController.userTasks)

router.post('/assignTask',taskController.assignTask)
router.post('/createBulk',taskController.updateBulk)
router.post('/markComplete',taskController.markComplete)

module.exports = router;