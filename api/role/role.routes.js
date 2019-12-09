var express = require('express');
var router = express.Router();
var roleController = require('./role.controller')
const { check } = require('express-validator/check');




router.get('/', roleController.getAll)
router.post('/', roleController.create)
router.put('/:roleId', roleController.update)
router.get('/get-roles-for-attendence', roleController.rolesForAttendence)

module.exports = router;