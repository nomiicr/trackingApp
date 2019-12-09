var express = require('express');
var router = express.Router();
var userController = require('./user.controller')
const { check } = require('express-validator/check');




router.post('/create',userController.create)

router.get('/viewAllEmployee/:adminId',userController.viewAllEmployee);
router.put('/editEmployee/:employeeId',userController.editEmployee);

module.exports = router;