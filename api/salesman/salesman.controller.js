let { user } = require('../../models/index');
const bcrypt = require('bcryptjs')


module.exports = {
    create: async (req, res) => {
        let { email, password, phone, firstName, lastName, address, adminId } = req.body

        try {
            let checkSalesman = await user.findAll({
                where: {
                    email: email
                }

            })
            if (checkSalesman.length > 0) {
                return res.send({
                    code: 500,
                    message: 'Salesman already exists ',
                    data: []
                })
            }
            let passHash = await bcrypt.hash(password, 10)
            let createSalesman = await user.create({
                email,
                password: passHash,
                phone,
                firstName,
                lastName,
                address,
                adminId,
                roleId: 4
            })
            res.send({
                code: 200,
                message: 'Saleman Created',
                data: createSalesman
            })
        } catch (error) {
            res.send({
                code: 500,
                message: 'Api failed',
                data: []
            })

        }
    },
    getAll: async (req, res) => {
        let { adminId } = req.params
        try {
            let getAllSalesman = await user.findAll({
                where: {
                    roleId: 5,
                    adminId
                }
            })
            res.send({
                code: 200,
                message: 'Salesman',
                data: getAllSalesman
            })

        } catch (error) {
            res.send({
                code: 500,
                message: 'api Failed',
                data: []
            })
        }
    }
    , update: async (req, res) => {
        let { salesmanId } = req.params;
        let { email, phone, firstName, lastName, address } = req.body

       
        try {
            let updateSalesman = await user.update({
                email,
                phone,
                firstName,
                lastName,
                address,


            },{
                where:{
                    id: salesmanId
                }
            });

 res.send({
     code : 200,
     message : 'Salesman Updated',
     data : updateSalesman
 })

        } catch (error) {
            res.send({
                code : 500,
                message : 'Api Failed',
                data : [error]
            })
        }
    }
}
