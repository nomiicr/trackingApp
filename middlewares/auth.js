const { user } = require("../models/index")

module.exports = {
    isLoginAllowedUser: async (req, res, next) => {
        let { email } = req.body
        let userEmailVerification = await user.findAll({
            where: {
                email
            }
        })
        if (userEmailVerification.length == 0) {
            return res.json({
                code: 403,
                token: "",
                message: 'No user with this Email found.'
            });
        } else if (userEmailVerification[0].isLoginAllowed == 0) {
            return res.json({
                code: 403,
                token: "",
                message: "Please Change Your Password First."
            });
        } else {
            next();
        }

    },

    isIMEI: async (req, res, next) => {
        let { imei, email } = req.body
        let userEmailVerification = await user.findAll({
            where: {
                email
            }
        })
        if (userEmailVerification[0].imei == null) {
            let userImeiUpdate = await user.update({
                imei
            }, {
                where: {
                    email
                }
            })

            next();
        } else if (userEmailVerification[0].imei != imei) {
            let userImeiUpdate = await user.update({
                isLoginAllowed: 0
            }, {
                where: {
                    email
                }
            })

            return res.json({
                code: 403,
                token: "",
                message: "Login not Allowed"
            });
        } else {
            next();
        }
    },
    isEmailExist: async (req, res, next) => {
        let { email } = req.body

        let checkUser = await user.findAll({
            where: {
                email
            }
        })

        if (checkUser.length > 0) {
            return res.json({
                code: 403,
                token: "",
                message: "User with this email Already exists."
            });
        }else{
            next();
        }
    }
}  