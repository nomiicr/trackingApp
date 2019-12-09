let { user, role } = require('../../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sendVerificationEmail,sendPasswordRecover,hostname } = require("../Email/Email.controller")

module.exports = {

    verifyUser: async (req, res) => {
        let { email } = req.query
        try {

            let checkVerifyUser = await user.findAll({
                where: {
                    email
                }
            })

            if (checkVerifyUser[0].length == 0) {
                return  res.sendFile('/pages/userVerify.html', { root:'.' });;

            } else if (checkVerifyUser[0].isEmailVerified == 1) {
                return  res.sendFile('/pages/userVerify.html', { root:'.' });
            } else {
                let updateuser = await user.update({
                    isEmailVerified: 1
                }, {
                    where: {
                        email
                    }
                })
                return  res.sendFile('/pages/userVerify.html', { root:'.' });

            }

        } catch (error) {
            return  res.sendFile('/pages/userVerify.html', { root:'.' });

        }

    },
    getUserByRole: async (req, res) => {
        let { roleId, adminId } = req.params
        try {
            let roletype = await user.findAll({
                where: {
                    roleId,
                    adminId
                }
            })
            res.send({
                code: 200,
                message: 'Roles type',
                data: roletype
            })
        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed',
                data: [error]
            })
        }
    },

    login: async (req, res) => {
        let { email, password } = req.body

        try {
        let users = await user.findOne({
            where: {
                email: email
            },
            include: [{
                model: role,
                as: 'role'
            }]
        })

        if (!users) {
            return res.json({
                code: 500,
                data: '',
                message: 'Invalid email or password.'
            });
        }

        const isPassword = await bcrypt.compare(password, users.password);
        if (!isPassword) {
            return res.json({
                code: 500,
                data: '',
                message: 'Invalid email or password.'
            });
        }

        const token = jwt.sign({ user: users }, 'jwtPrivateKey');
        return res.json({
            code: 200,
            data: '',
            token: token,
            message: 'Login succesful.'
        });
        } catch (error) {
            return res.json({
                code: 500,
                data: '',
                message: 'API failed.'
            });
        }
    },
    changePassword: async (req, res) => {
        let { email, password } = req.body

        try {

            let passHash = await bcrypt.hash(password, 10)
            console.log(email)
            let userPass = await user.update({
                password: passHash,
                isLoginAllowed: 1,
            }, {
                where: {
                    email
                }
            })

            console.log(userPass)
            return res.send({
                code: 200,
                data: userPass,
                message: 'Password Updated',
            })

        } catch (error) {
            return res.send({
                code: 500,
                message: 'API failed',
            })

        }
    },
    createUsers: async (req, res) => {
        let { email, phone, firstName, lastName, address, adminId, roleId } = req.body
        let pass = "user123"
        let emailBody = `<h1>Welcome</h1>
        <a href="http://${hostname}/v1/api/common/verifyUser?email=${email}">
        Click here to verify your account.
        </a>
        User Current Password is: ${pass}
        `
        try {
            let checkUser = await user.findAll({
                where: {
                    email: email
                }

            })
            if (checkUser.length > 0) {
                return res.send({
                    code: 500,
                    message: 'User already exists ',
                    data: []
                })
            }

            let passHash = await bcrypt.hash(pass, 10)
            let createUser = await user.create({
                email,
                phone,
                password: passHash,
                firstName,
                lastName,
                address,
                adminId,
                roleId,
            })
            sendVerificationEmail(email, "test", emailBody)
                .then((response) => {
                    res.send({
                        code: 200,
                        message: 'User created',
                        data: createUser
                    })
                }).catch((error) => {

                    res.send({
                        code: 500,
                        data: [error],
                        message: 'Email Api failed',
                    })
                })

        } catch (error) {
            res.send({
                code: 500,
                message: 'Api failed',
                data: []
            })

        }
    },
    updateUser: async (req, res) => {
        let { userId } = req.params;
        let { email, phone, firstName, lastName, address } = req.body


        try {
            let updateSalesman = await user.update({
                email,
                phone,
                firstName,
                lastName,
                address,


            }, {
                where: {
                    id: userId
                }
            });

            res.send({
                code: 200,
                message: 'User Updated',
                data: updateSalesman
            })

        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed',
                data: [error]
            })
        }
    },
    forgotPassword : async (req,res) => {
        let {email} = req.body

        
        try {
            let recoverPassword = await user.findAll({
             where : {
                 email
             }
             
        
            })
            if(recoverPassword.length == 0){
                return res.send({
                    code : 404,
                    message: 'No Email Found'
                })

            } 
            let newPassword = await bcrypt.hash("user123",10);
              let updatePassword = await admin.update({
                   password :newPassword,
                   isLoginAllowed: 0
              }, {
                  where: {
                      email
                  }
              })
              let body =`Your password is reset to ${updatePassword}` 

            sendPasswordRecover(email,'Password Recover',body).then(()=>{
                res.send({
                    code : 200,
                    message: 'Kindly check your Email'
                })
            }).catch((err)=>{
                res.send({
                    code : 500,
                    message: ' Email Api Failed'
                })
            })
            

        } catch (error) {
            
        }
    }
}