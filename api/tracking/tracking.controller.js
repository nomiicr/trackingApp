
const { tracking, attendence, task, meetings } = require('../../models/index')
const { validationResult } = require('express-validator/check');
const io = require('../../io')

module.exports = {
    insertTrackingData: async (req, res) => {
        let { userId, date, latitude, longitude } = req.body

        try {
            let trackingResult = await tracking.create({
                userId: userId,
                date: date,
                latitude: latitude,
                longitude: longitude
            })
            if (trackingResult) {
                io.emit('track_user', { data: trackingResult });

                res.send({
                    'message': 'coordinates inserted',
                    'data': 1,
                    'code': 200,

                })
            } else {
                res.send({
                    'message': 'unable to insert coordinates',
                    'data': '',
                    'code': 500
                })
            }
        } catch (error) {
            res.send({
                'message': 'API Failed',
                'data': '',
                'code': 500
            })
        }
    },

    syncBulkTrackData: async (req, res) => {
        let { data } = req.body
        if (data.length != 0) {
            var temp = 0;
            try {
                for (var i = 0; i < data.length; i++) {
                    let trackingResult = await tracking.create({
                        userId: data[i].userId,
                        date: data[i].date,
                        latitude: data[i].latitude,
                        longitude: data[i].longitude
                    })
                    temp = (i + 1)
                }
                if (temp == data.length) {
                    res.send({
                        'message': 'coordinates inserted',
                        'data': 1,
                        'code': 200
                    })
                } else {
                    res.send({
                        'message': 'unable to insert coordinates',
                        'data': 0,
                        'code': 500
                    })
                }
            } catch (error) {
                res.send({
                    'message': 'API Failed',
                    'data': 0,
                    'code': 500
                })
            }
        }
    },

    getUserTrack: async (req, res) => {
        // try {
            let { userId, date } = req.params

            let checkOutTime = await attendence.findAll({
                attributes: ['checkOutTime'],
                where: {
                    userId: userId,
                    date: date
                }
            })


            var trackData = await tracking.findAll({
                where: {
                    date: date,
                    userId: userId
                }, include: [{
                    model: task,
                    as: 'task'
                },
                {
                    model: meetings,
                    as: 'meeting'
                }],
                order: [
                    ['id', 'ASC'],
                ],
            })

            if (checkOutTime.length > 0 && checkOutTime[0].checkOutTime != '00:00:00') {
                res.send({
                    'message': 'track data found',
                    'isCheckedOut': 1,
                    'data': trackData,
                    'code': 200
                })
            } else {
                res.send({
                    'message': 'user not checked out.',
                    'isCheckedOut': 0,
                    'data': trackData,
                    'code': 200
                })
            }

        // } catch (error) {
        //     res.send({
        //         'message': 'API Failed',
        //         'data': 0,
        //         'code': 500
        //     })
        // }
    }
}