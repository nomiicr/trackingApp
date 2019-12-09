const { admin } = require('../../models/index')
const { validationResult } = require('express-validator/check')
const EmailController = require("../Email/Email.controller")
const jwtdecode = require('jwt-decode')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const seq = require('sequelize').Op;
const io = require('../../io')
module.exports = {

    login: async (req, res) => {
        let { email, password } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ code: 500, data: '', message: errors.array() });
        }
        try {
            let adminResult = await admin.findOne({
                where: {
                    email: email
                }
            })
            if (!adminResult) return res.json({ code: 500, data: '', message: 'Invalid email or password.' });

            const isPassword = await bcrypt.compare(password, adminResult.password);
            console.log(isPassword)
            if (!isPassword) return res.json({ code: 500, data: '', message: 'Invalid email or password.' });

            const token = jwt.sign({ adminResult }, 'jwtPrivateKey');

            return res.json({
                code: 200,
                message: 'Login successful',
                token: token,
                data: ''
            })

        } catch (error) {
            return res.json({ code: 500, data: '', message: 'Api Failed' });
        }
    },
    verifyAdmin: async (req, res) => {
        let { email } = req.query

        try {
            let decodeEmail = jwtdecode(email).email
            console.log(decodeEmail)
            let checkVerifyAdmin = await admin.findAll({
                where: {
                    email: decodeEmail
                }
            })

            if (checkVerifyAdmin[0].length == 0) {
                return res.redirect("http://hrm.mmcgbl.com/verify")


            } else if (checkVerifyAdmin[0].isEmailVerified == 1) {
                return res.redirect("http://hrm.mmcgbl.com/alreadyVerified")

            } else {
                let updateAdmin = await admin.update({
                    isEmailVerified: 1
                }, {
                    where: {
                        email: decodeEmail
                    }
                })
                return res.redirect("http://hrm.mmcgbl.com/verify")


            }

        } catch (error) {
            return res.redirect("http://hrm.mmcgbl.com/error")

        }
    },
    register: async (req, res) => {
        let { email, password, phone, firstname, lastname, address } = req.body
        let jwtEmail = jwt.sign({ email }, "jwtPrivateKey")
        let emailBody = `<h1>Welcome</h1>
        <a href="http://${EmailController.hostname}/v1/api/admin/verifyAdmin?email=${jwtEmail}">
        Click here to verify your account.
        </a>`

        try {
            let checkAdmin = await admin.count({
                where: {
                    email: email
                }
            })

            if (checkAdmin > 0) return res.json({ code: 500, token: '', message: 'User already exist.' });

            let passHash = await bcrypt.hash(password, 10)
            let adminResult = await admin.create({
                email: email,
                password: passHash,
                firstName: firstname,
                lastName: lastname,
                phone: phone,
                address: address,
                isActive: 1,
                roleId: 2
            })
            const token = jwt.sign({ adminResult }, 'jwtPrivateKey', {
                expiresIn: '24h'
            });

            if (adminResult) {
                EmailController.sendVerificationEmail(email, "test", emailBody)
                    .then((response) => {

                        res.send({
                            code: 200,
                            message: 'User Created ',
                            token: token
                        })
                    }).catch((error) => {

                        res.send({
                            code: 500,
                            token: error,
                            message: 'Email Api failed',
                        })
                    })
            } else {
                return res.json({ code: 500, token: '', message: 'enable to register.' });
            }
        } catch (error) {
            return res.json({ code: 500, token: '', message: 'Api Failed' });
        }
    },

    // allowAdmin: async (req, res) => {
    //     let { email } = req.params
    //     try {
    //         let allowAdmin = await admin.update({
    //             isAllowed: 1
    //         }, {
    //             where: {
    //                 email
    //             }
    //         })
    //         res.send({
    //             code: 200,
    //             token: "",
    //             message: 'Admin allowed.',
    //         })
    //     } catch (error) {
    //         res.send({
    //             code: 500,
    //             token: "",
    //             message: 'Api failed',
    //         })
    //     }
    // },
    forgotPassword: async (req, res) => {
        let { email } = req.body

        console.log(email)
        try {
            let recoverPassword = await admin.findAll({
                where: {
                    email
                }


            })
            if (recoverPassword.length == 0) {
                return res.send({
                    code: 404,
                    message: 'No Email Found'
                })

            }
            let pass = "user123"
            let newPassword = await bcrypt.hash(pass, 10);
            let updatePassword = await admin.update({
                password: newPassword
            }, {
                where: {
                    email
                }
            })
            let body = `Your password is reset to ${pass}`

            EmailController.sendPasswordRecover(email, 'Password Recover', body).then(() => {
                res.send({
                    code: 200,
                    data: updatePassword,
                    message: 'Kindly Check your Email'
                })
            }).catch((err) => {
                res.send({
                    code: 500,
                    data: err,
                    message: 'Email Api Failed'
                })
            })


        } catch (error) {

        }
    },
    getAll: async (req, res) => {
        try {
            let viewAllAdmin = await admin.findAll({
                where : {
                 roleId : {
                     [seq.not] : 1
                 }
                }
            })
            res.send({
                code: 200,
                data: viewAllAdmin
            })
        } catch (error) {
            res.send({
                code: 500,
                message: "api Failed"
            })
        }
    },

    isAllowAdmin: async (req, res) => {
        let { isAllow } = req.body
        let { id } = req.params
        try {
            let allow = await admin.update({
                isAllowed: isAllow

            }, {
                where: {
                    id
                }
            })
            io.emit('isAllowed',{isAllow,id});
            res.send({
                code: 200,
                message: "Admin Allow",
                data: allow
            })

        } catch (error) {
            res.send({
                code: 500,
                message: "api Failed"
            })
        }
    }

}