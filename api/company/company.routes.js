var express = require('express');
var router = express.Router();
var companyController = require('./company.controller')
const { check } = require('express-validator/check');




router.post('/', companyController.create)

router.get('/getAll/:adminId', companyController.getAllAdminCompany)
router.get('/getCompany', companyController.getCompany)
router.put('/:companyId', companyController.editCompany)

module.exports = router;