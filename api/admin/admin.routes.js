var express = require('express');
var router = express.Router();
var adminController = require('./admin.controller')
const { check } = require('express-validator/check');
const { isAdminEmailVerified } = require("../../middlewares/isEmailVerified")

router.post('/login', isAdminEmailVerified, adminController.login)
router.post('/forgetpassword', adminController.forgotPassword)


router.post('/register', adminController.register)
router.get('/verifyAdmin', adminController.verifyAdmin)
router.get('/getAllAdmin',adminController.getAll)
router.put('/allowAdmin/:id',adminController.isAllowAdmin)

module.exports = router;