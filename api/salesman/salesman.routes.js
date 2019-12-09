var express = require('express');
var router = express.Router();
var salesmanController = require('./salesman.controller')
const { check } = require('express-validator/check');




router.post('/',salesmanController.create)
router.get('/:adminId',salesmanController.getAll)
router.put('/:salesmanId',salesmanController.update)

module.exports = router;