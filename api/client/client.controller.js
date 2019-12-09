let { user, sequelize } = require('../../models/index');


module.exports = {

    create: async (req, res) => {
        let { email, firstName, lastName, phone, companyId, designation, adminId, salesmanId } = req.body;

        try {

            let createClient = await user.create({
                email,
                firstName,
                lastName,
                phone,
                designation,
                roleId: 3,
                salesmanId: salesmanId,
                adminId,
                companyId
            })


            res.send({
                code: 200,
                message: 'Client Created ',
                data: createClient
            })
        } catch (error) {
            console.log(error)
            res.send({
                code: 500,
                message: 'Api Failed',
                data: error
            })



        }


    },

    getAll: async (req, res) => {
        let { adminId } = req.params
        try {
            let getAllClient = await user.findAll({
                where: {
                    roleId: 3,
                    adminId
                },
                include: [{
                    model: user,
                    as: 'salesman',
                    attributes: ['id', [sequelize.fn('CONCAT', sequelize.col('salesman.firstName'), ' ', sequelize.col('salesman.lastName')), 'Name'], 'email']
                }]
            })
            res.send({
                code: 200,
                message: 'Clients',
                data: getAllClient
            })

        } catch (error) {
            res.send({
                code: 500,
                message: 'api Failed',
                data: [error]
            })
        }
    },

    getAllMobile: async (req, res) => {
        let { adminId } = req.query

        try {
            let getAllClient = await user.findAll({
                where: {
                    roleId: 3,
                    adminId
                },
                attributes: ['id', 'firstName', 'lastName'],

            })
            res.send({
                code: 200,
                message: 'Clients',
                data: getAllClient
            })

        } catch (error) {
            res.send({
                code: 500,
                message: 'api Failed',
                data: [error]
            })
        }
    },

    createBulk: async (req, res) => {
        let { data } = req.body
        // let data = [{
        //     email: "client@gmail.com",
        //     password: "",
        //     phone: "0123123123",
        //     firstName: "client",
        //     lastName: "test",
        //     adminId: 3,
        //     salesmanId: 3,
        //     companyId: 4
        // }, {
        //     email: "client1@gmail.com",
        //     password: "",
        //     phone: "0123123123",
        //     firstName: "client1",
        //     lastName: "test1",
        //     adminId: 3,
        //     salesmanId: 3,
        //     companyId: 4
        // }]
        try {
            if (data.length > 0) {
                data.forEach(async (val) => {

                    let checkUser = await user.findAll({
                        where: {
                            email: val.email
                        }
                    })

                    if (checkUser.length == 0) {

                        let obj = {
                            email: val.email,
                            phone: val.phone,
                            firstName: val.firstName,
                            lastName: val.lastName,
                            adminId: val.adminId,
                            salesmanId: val.salesmanId,
                            companyId: val.companyName
                        }
                        let createBulk = await user.create(obj)
                    }
                })

                res.send({
                    code: 200,
                    message: 'Bulk created',
                })
            }
        } catch (error) {
            res.send({
                code: 500,
                message: 'API failed',
                data: [error]
            })
        }
    },
    updateClient: async (req, res) => {
        let { email, firstName, lastName, phone, companyId, designation } = req.body;
        let { clientId } = req.params
        try {
            let updateClient = await user.update({
                email,
                firstName,
                lastName,
                phone,
                companyId,
                designation



            },
                {
                    where: {
                        id: clientId
                    }
                })
            res.send({
                code: 200,
                data: updateClient,
                message: 'Updated Client'
            })

        } catch (error) {
            res.send({
                code: 500,
                data: error,
                message: 'Api Failed'
            })
        }


    },

    getAllClientByCompany: async (req, res) => {
        let { companyId } = req.query;
        console.log(req.query)
        try {
            let allClient = await user.findAll({
                where: {
                    companyId,
                    roleId: 3
                }
            })
            res.send({
                code: 200,
                message: "get All client",
                data: allClient
            })
        } catch (err) {
            res.send({
                code: 500,
                message: "Api Failed",
                data: err
            })
        }
    }
}