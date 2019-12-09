const { role, sequelize } = require('../../models/index');
const op = require('sequelize').Op


module.exports = {

    create: async (req, res) => {
        let { name } = req.body
        try {
            let checkRole = await role.findAll({
                where: {
                    name: name
                }

            })
            if (checkRole.length > 0) {
                res.send({
                    code: 200,
                    message: 'Role Already Exists',
                    data: []
                })
            } else {
                let createdRole = await role.create({
                    name: name

                })
                res.send({
                    code: 200,
                    message: 'Role Created',
                    data: createdRole
                })
            }


        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed',
                data: []
            })

        }

    },
    update: async (req, res) => {
        let { roleId } = req.params
        let { name } = req.body
        try {
            let updateRole = await role.update({
                name: name
            },
                {
                    where: {
                        id: roleId
                    }
                })
            res.send({
                code: 200,
                message: 'Role Updated',
                data: updateRole
            })

        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed ',
                data: []
            })
        }

    },
    getAll: async (req, res) => {
        try {
            let getRoles = await role.findAll({

            });
            res.send({
                code: 200,
                message: 'Roles',
                data: getRoles

            })
        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed',
                data: []
            })

        }
    },
    rolesForAttendence: async (req, res) => {
        try {
            let roles = await role.findAll({
                where: {

                    id: {
                        [op.notIn]: [1, 2, 3]
                    }
                }
            })
            res.send({
                code: 200,
                message: "Attendence Roles",
                data: roles
            })
        } catch (error) {
            res.send({
                code: 500,
                message: "Api Failed",
                data: error
            })

        }


    }
}
