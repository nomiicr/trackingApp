const { company } = require('../../models/index');


module.exports = {
    create: async (req, res) => {
        let { name, email, website, phone, address, type, adminId } = req.body

        try {
            let createCompany = await company.create({
                name,
                email,
                address,
                website,
                phone,
                type,
                createdBy: adminId
            })

            res.send({
                code: 200,
                data: createCompany,
                message: 'Company Created'
            })

        } catch (error) {
            res.send({
                code: 500,
                data: error,
                message: 'Api Failed'
            })
        }
    },

    getAllAdminCompany: async (req, res) => {
        let { adminId } = req.params
        try {
            let getAdminCompany = await company.findAll({
                where: {
                    createdBy: adminId
                }
            })
            res.send({
                code: 200,
                data: getAdminCompany,
                message: "Company Result"
            })
        } catch (error) {
            res.send({
                code: 500,
                data: err,
                message: "Api Failed"
            })
        }
    },

    getCompany: async (req, res) => {
        let { adminId } = req.query
        try {
            let getAdminCompany = await company.findAll({
                attributes: ['name', 'id'],
                where: {
                    createdBy: adminId
                }
            })
            res.send({
                code: 200,
                data: getAdminCompany,
                message: "Company Result"
            })
        } catch (error) {
            res.send({
                code: 500,
                data: [err],
                message: "Api Failed"
            })
        }
    },

    editCompany: async (req, res) => {
        let { companyId } = req.params
        let { name, email, website, phone, address, type } = req.body
        try {
            let editCompanies = await company.update({
                name,
                email,
                website,
                phone,
                address,
                type
            },
                {
                    where: {
                        id: companyId
                    }
                })
            res.send({
                code: 200,
                data: editCompanies,
                message: 'Company Update'
            })
        } catch (error) {
            res.send({
                code: 500,
                data: err,
                message: 'Api Failed'
            })
        }
    }

}