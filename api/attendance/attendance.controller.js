const { sequelize, attendence, user, tracking } = require('../../models/index')
const Op = sequelize.Op;

module.exports = {
    markAttendance: async (req, res) => {
        try {
            let { latitude, longitude, type, date, time, userId } = req.body
            let attendenceResult = null;
            let attendanceCount = await attendence.count({
                where: {
                    date: date,
                    userId: userId
                }
            })

            if (attendanceCount >= 1 && type == "CheckedIn")
                return res.send({
                    'message': 'Attendance already marked.',
                    'data': '',
                    'code': 500
                })

            if (attendanceCount == 1 && type == 'CheckedOut') {
                attendenceUpdate = await attendence.update({
                    checkOutTime: time,
                    isPresent: 1
                }, {
                    where: {
                        date: date,
                        userId: userId
                    }
                })

                attendenceResult = await attendence.findOne({
                    where: {
                        date: date,
                        userId: userId
                    }
                })
            } else {
                attendenceResult = await attendence.create({
                    userId: userId,
                    date: date,
                    checkInTime: time,
                    checkOutTime: '00:00:00'
                })
            }

            let trackingResult = await tracking.create({
                userId: userId,
                latitude: latitude,
                longitude: longitude,
                date: date,
            })
            // io.emit('track_User', {data: [trackingResult]});
            res.send({
                'message': 'Attendance Marked',
                'data': attendenceResult,
                'code': 200
            })
        } catch (error) {
            res.send({
                'message': 'API failed',
                'data': error,
                'code': 500
            })
        }
    },

    getAttendanceByDate: async (req, res) => {
        let { userId, date } = req.query
        try {
            let attendenceResult = await attendence.findAll({
                where: {
                    date: date,
                    userId: userId
                }
            })

            res.send({
                'message': 'success',
                'data': attendenceResult,
                'code': 200
            })
        } catch (error) {
            res.send({
                'message': 'Attendance API failed',
                'data': error,
                'code': 500
            })
        }
    },

    getAttendance: async (req, res) => {
        let { userId, dateFrom, dateTo, roleId } = req.query

        try {

            let whereObj = {}
            whereObj.date = {
                [Op.between]: [dateFrom, dateTo]
            }
            if (userId != 'null') {
                whereObj.userId = userId
            }

            let attendenceResult = await attendence.findAll({
                where: whereObj,
                include: [{
                    model: user,
                    as: 'user',
                    where: {
                        roleId: roleId
                    },
                    attributes: [[sequelize.fn('CONCAT', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'username']]
                }],
            })

            res.send({
                'message': 'success',
                'data': attendenceResult,
                'code': 200
            })
        } catch (error) {
            res.send({
                'message': 'Attendance API failed',
                'data': [error],
                'code': 500
            })
        }
    },

    bulkAttendance: async (req, res) => {
        // let { data } = req.body

        try {
            if (req.body.length != 0) {

                let checkedIn = req.body.filter(x => x.type == "CheckedIn")
                let checkedOut = req.body.filter(x => x.type == "CheckedOut")

                checkedIn.map(async (val) => {
                    let bulkInsert = await attendence.create({
                        date: val.date,
                        userId: val.userId,
                        checkInTime: val.time,
                        checkOutTime: "00:00:00"
                    })

                    let bulktracking = await tracking.create({
                        userId: val.userId,
                        date: val.date,
                        latitude: val.latitude,
                        longitude: val.longitude
                    })
                })

                checkedOut.map(async (val) => {
                    let bulkUpdate = await attendence.update({
                        checkOutTime: val.time,
                        isPresent: 1
                    }, {
                        where: {
                            date: val.date
                        }
                    })

                    let bulkUpdateTrack = await tracking.create({
                        userId: val.userId,
                        date: val.date,
                        latitude: val.latitude,
                        longitude: val.longitude
                    })
                })
                res.send({
                    'message': 'success',
                    'code': 200,
                })
            }
        } catch (error) {
            res.send({
                'message': 'API Failed',
                'code': 500
            })
        }
    }

}