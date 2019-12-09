
const { validationResult } = require('express-validator/check');
const { sequelize, user, tracking, task, userTask } = require('../../models/index')
const Op = sequelize.Op

module.exports = {
    assignTask: async (req, res) => {
        let { title, description, assignDate, dueDate, adminId, userId } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ code: 500, data: '', message: errors.array() });
        }

        try {
            let tasks = await task.create({

                title: title,
                description: description,
                date: assignDate,
                dueDate,
                createdBy: adminId,
                completed: 0
            })

            let bulkTask = userId.map(x => {
                return {
                    userId: x,
                    taskId: tasks.id
                }
            })

            let bulkResult = await userTask.bulkCreate(bulkTask)


            res.send({
                'message': 'success',
                'data': userTask,
                "code": 200
            })

        } catch (error) {
            res.send({
                'message': 'API failed.',
                'data': error,
                "code": 500
            })
        }
    },

    viewEmployeeTask: async (req, res) => {
        try {
            let { userId, dateFrom, dateTo } = req.query
            console.log(req.query);

            let userTasks = await task.findAll({
                include: [{
                    model: user,
                    attributes: ['firstName', 'lastName'],
                    where: {
                        id: userId
                    }
                }],
                order: [
                    ['id', 'DESC']
                ],
                where: {
                    date: {
                        [Op.between]: [dateFrom, dateTo]
                    },
                }
            })
            res.send({
                'message': 'success',
                'data': userTasks,
                "code": 200
            })

        } catch (error) {
            res.send({
                'message': 'API failed',
                "code": 500
            })
        }
    },

    userTasks: async (req, res) => {
        try {
            let { userId, date } = req.query
            let userTasks = await task.findAll({
                attributes: { exclude: ['createdBy'] },
                include: [{
                    model: user,
                    through: { attributes: [] },
                    attributes: ['id', 'firstName', 'lastName'],
                    where: {
                        id: userId
                    }
                }],
                where: {
                    date: date
                }
            })

            res.send({
                'message': 'success',
                'data': userTasks,
                "code": 200
            })

        } catch (error) {
            res.send({
                'message': 'API failed',
                'err': err,
                "code": 500
            })
        }
    },

    markComplete: async (req, res) => {
        let { userId, latitude, longitude, date } = req.body
        let { taskId } = req.query
        console.log(taskId, "asdasasdas")
        // try {
        let userTasks = await task.update({
            completed: 1
        }, {
            where: {
                id: taskId
            }
        })
        let userTaskTracking = tracking.create({
            userId: userId,
            date: date,
            latitude: latitude,
            longitude: longitude,
            taskId: taskId,
        })
        res.send({
            'message': 'Task Updated',
            // 'data': userTasks,
            "code": 200
        })
        // } catch (error) {
        //     res.send({
        //         'message': 'Failed to update',
        //         // 'data': error,
        //         "code": 500
        //     })
        // }
    },

    updateBulk: async (req, res) => {
        let { datas } = req.body
        let data = [{
            id: 1,
            completed: 1
        }, {
            id: 2,
            completed: 1
        }]
        try {
            let createBulk = await task.bulkCreate(data, {
                updateOnDuplicate: ["completed","updatedAt"]
            })

            res.send({
                code: 200,
                message: 'Bulk created',
            })
        } catch (error) {
            res.send({
                code: 500,
                message: 'API failed',
            })
        }
    }
}