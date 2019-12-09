var express = require('express');
var router = express.Router();
var riderController = require('./rider.controller')
const { check } = require('express-validator/check');




router.post('/',riderController.create)

router.get('/:adminId',riderController.getAll)
router.put('/:riderId',riderController.updateRider)

module.exports = router;