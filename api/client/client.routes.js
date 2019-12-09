var express = require('express');
var router = express.Router();
var clientController = require('./client.controller')
var { isEmailExist } = require('../../middlewares/auth')
const { check } = require('express-validator/check');



router.put('/:clientId', clientController.updateClient)

router.post('/', isEmailExist, clientController.create)
router.post('/createBulk', clientController.createBulk)

router.get('/companyClient', clientController.getAllClientByCompany)
router.get('/getClient', clientController.getAllMobile)
router.get('/:adminId', clientController.getAll)

module.exports = router;