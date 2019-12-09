const { admin, user } = require("../models/index")

module.exports = {
    isAdminEmailVerified: async (req, res, next) => {
        let { email } = req.body
        let userEmailVerification = await admin.findAll({
            where: {
                email
            }
        })
        if (userEmailVerification.length == 0) {
            return res.json({
                code: 500,
                token: "",
                message: 'No user with this Email found.'
            });
        } else if (userEmailVerification[0].isEmailVerified == 0) {
            return res.json({
                code: 500,
                token: "",
                message: 'Please verify user email first.'
            });
        } else if (userEmailVerification[0].isAllowed == 0) {
            return res.json({
                code: 500,
                token: "",
                message: "You are not allowed to access this web"
            });
        } else {
            next();
        }

    },
    isUserEmailVerified: async (req, res, next) => {
        let { email } = req.body
        let userEmailVerification = await user.findAll({
            where: {
                email
            }
        })
        if (userEmailVerification.length == 0) {
            return res.json({
                code: 500,
                token: "",
                message: 'No user with this Email found.'
            });
        } else if (userEmailVerification[0].isEmailVerified == 0) {
            return res.json({
                code: 500,
                token: "",
                message: 'Please verify user email first.'
            });
        } else {
            next();
        }

    },
}  