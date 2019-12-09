var express = require('express');
var router = express.Router();
var commonController = require('./common.controller')
const { check } = require('express-validator/check');
const { isUserEmailVerified } = require("../../middlewares/isEmailVerified")
const { isLoginAllowedUser, isIMEI } = require("../../middlewares/auth")



router.get('/get-user-by-role/:roleId/:adminId', commonController.getUserByRole)
router.get('/verifyUser', commonController.verifyUser)

router.post('/login', isUserEmailVerified, isLoginAllowedUser, isIMEI, commonController.login)
router.post("/changePassword",commonController.changePassword)
router.put('/updateUser/:userId', commonController.updateUser)
router.post('/createUser', commonController.createUsers)
router.post('/forgetpassword', commonController.forgotPassword)


module.exports = router;