var { user } = require('../../models/index')
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sendVerificationEmail, hostname } = require("../Email/Email.controller")

module.exports = {

    create: async (req, res) => {
        let { email, password, phone, firstname, lastname, image, adminId } = req.body
        const error = validationResult(req)
        let emailBody = `<h1>Welcome</h1>
        <a href="http://${hostname}/v1/api/common/verifyUser?email=${email}">
        Click here to verify your account.
        </a>`
        if (!error.isEmpty()) {
            return res.json({ code: 500, data: '', message: error.array()[0] });
        }

        try {
            let checkUser = await user.findOne({ where: { email: email } });

            if (checkUser) {
                return res.json({
                    code: 500,
                    data: [],
                    message: 'User already exists.'
                });
            }
            const passwordHash = await bcrypt.hash(password, 10);

            const users = await user.create({
                adminId: adminId,
                email: email,
                password: passwordHash,
                phone: phone,
                firstName: firstname,
                lastName: lastname,
                image: image,
                isActive: 1
            })
            if (!users) {
                return res.json({
                    code: 500,
                    data: [],
                    message: 'Unable to add employee.'
                });
            }
            sendVerificationEmail(email, "test", emailBody)
                .then((response) => {
                    res.json({
                        code: 200,
                        data: users,
                        message: 'Employee created.'
                    });
                }).catch((error) => {

                    res.send({
                        code: 500,
                        data: [error],
                        message: 'Email Api failed',
                    })
                })

        } catch (error) {
            return res.json({
                code: 500,
                data: [],
                message: 'API failed.'
            });
        }
    },

    viewAllEmployee: async (req, res) => {
        try {
            let { adminId } = req.params

            let users = await user.findAll({
                attributes: ['email', 'id', 'phone', 'firstName', 'lastName'],
                where: {
                    adminId: adminId
                },
                order: [
                    ['id', 'DESC']
                ]
            })
            return res.json({
                code: 200,
                data: users,
                message: ''
            });
        } catch (error) {
            return res.json({
                code: 500,
                data: '',
                message: 'API failed.'
            });
        }
    },

    editEmployee: async (req, res) => {
        try {
            const { adminId, firstname, lastname, email, phone } = req.body;
            const { employeeId } = req.params;
            let updated = await user.update({
                firstName: firstname,
                lastName: lastname,
                email: email,
                phone: phone,
            }, {
                where: {
                    Id: employeeId,
                }
            }
            )

            res.send({
                'message': 'updated successfully',
                'data': updated,
                "code": '200'
            })

        } catch (error) {
            res.send({
                'message': 'API failed',
                'data': error,
                "code": '500'
            })

        }
    }
}