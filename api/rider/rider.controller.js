const { user } = require('../../models/index');
const bcrypt = require('bcryptjs')

module.exports = {

    create: async (req, res) => {
        let { email, password, phone, firstName, lastName, address, adminId } = req.body
        let passHash = await bcrypt.hash(password, 10)

        try {
            let checkRider = await user.findAll({
                where: {
                    email
                }
            })
            if (checkRider.length > 0) {
                return res.send({
                    code: 500,
                    message: 'rider already exists',
                    data: []
                })
            }
            let createRider = await user.create({
                email,
                password: passHash,
                phone,
                firstName,
                lastName,
                address,
                adminId,
                roleId: 3

            })


            res.send({
                code: 200,
                message: 'Rider Created',
                data: createRider
            })


        } catch (error) {
            res.send({
                code: 500,
                message: 'Api failed',
                data: [error]
            })
        }
    },

    getAll: async (req, res) => {
        let { adminId } = req.params
        try {
            let getAllRider = await user.findAll({
                where: {
                    adminId: adminId,
                    roleId: 4

                }
            })
            res.send({
                code: 200,
                message: 'Riders',
                data: getAllRider
            })
        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed',
                data: [error]
            })
        }

    },
    updateRider: async (req, res) => {
        let { adminId, email, firstName, lastName, phone, address } = req.body;
        let { riderId } = req.params
        try {
            let updateRider = await user.update({
                firstName,
                lastName,
                phone,
                address,
                email


            },
                {
                    where: {
                        id: riderId,
                        adminId
                    }
                })

                res.send({
                    code: 200,
                    message: ' Rider Updated ',
                    data: updateRider
                })
        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed ',
                data: [error]
            })
        }
    }
}