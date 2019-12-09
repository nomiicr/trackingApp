const { sequelize, meetings, tracking, user } = require('../../models/index');
const Op = sequelize.Op;



module.exports = {
    create: async (req, res) => {
        let { clientId, salesManId, time, title, description, date, lat, lng, client_email, client_first_name, client_last_name, client_phone, client_company, client_designation, client_adminId } = req.body
        try {
            var obj = {
                salesManId,
                date,
                time,
                title,
                description
            }
            let checkClient = await user.findAll({
                where: {
                    email: client_email
                }
            })

            if (checkClient.length > 0) {
                obj.clientId = clientId
            } else {
                let createClient = await user.create({
                    email: client_email,
                    firstName: client_first_name,
                    lastName: client_last_name,
                    phone: client_phone,
                    designation: client_designation,
                    roleId: 3,
                    salesmanId: salesManId,
                    adminId: client_adminId,
                    companyId: client_company
                })
                obj.clientId = createClient.id
            }
            let createMeeting = await meetings.create(obj)

            let userTaskTracking = await tracking.create({
                userId: salesManId,
                date: date,
                latitude: lat,
                longitude: lng,
                meetingId: createMeeting.id,
            })
            res.send({
                code: 200,
                message: 'Create Meeting',
                data: createMeeting
            })

        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed',
                data: [error]
            })
        }

    },

    getAll: async (req, res) => {
        let { saleManIds, dateFrom, dateTo } = req.query;

        try {

            let whereObj = {}
            whereObj.date = {
                [Op.between]: [dateFrom, dateTo]
            }
            // console.log("dasdasd,",saleManIds);
            if (saleManIds != 'null') {
                console.log("dasdasd,", req.query);

                whereObj.salesManId = saleManIds
            }
            let getAllMeetins = await meetings.findAll({
                where: whereObj,
                include: [{
                    model: user,
                    as: 'salesMan'

                },
                {
                    model: user,
                    as: 'client'
                },
            {
                model:tracking,
               
            }]
            })

            res.send({
                code: 200,
                message: 'meetings',
                data: getAllMeetins

            })
        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed',
                data: [error]
            })
        }
    },

    getAllMobile: async (req, res) => {
        let { saleManIds, date } = req.query;
        try {

            let whereObj = {}
            console.log("dasdasd,", req.query);
            whereObj.date = {
                date: date
            }
            if (saleManIds != 'null') {
                console.log("dasdasd,", req.query);

                whereObj.salesManId = saleManIds
            }
            console.log(whereObj)
            let getAllMeetins = await meetings.findAll({
                where: whereObj,
                include: [{
                    model: user,
                    as: 'client',
                    attributes: ['id', [sequelize.fn('concat', sequelize.col('client.firstName'), ' ', sequelize.col('client.lastName')), "name"]]

                }]
            })
            console.log(getAllMeetins);

            res.send({
                code: 200,
                message: 'meetings',
                data: getAllMeetins

            })
        } catch (error) {
            res.send({
                code: 500,
                message: 'Api Failed',
                data: [error]
            })
        }
    },

    // createBulk: async (req, res) => {
    //     let { data } = req.body

    //     try {
    //         if (data.length != 0) {
    //             let finalDataResult = data.map(async (val) => {
    //                 let finalData = {
    //                     clientId: val.clientId,
    //                     salesManId: val.salesManId,
    //                     time: val.time,
    //                     date: val.date,
    //                     title: val.title,
    //                     description: val.description,
    //                     tracking: [{
    //                         userId: val.salesManId,
    //                         date: val.date,
    //                         latitude: val.latitude,
    //                         longitude: val.longitude
    //                     }]
    //                 }
    //                 return createBulkMeetings = await meetings.create(finalData, {
    //                     include: [tracking]
    //                 })
    //             })

    //             res.send({
    //                 code: 200,
    //                 message: 'Creating bulk meetings...',
    //             })
    //         }
    //     } catch (error) {
    //         res.send({
    //             code: 500,
    //             message: 'API failed',
    //         })
    //     }
    // },


    createBulks: async (req, res) => {
        // let { clientId, salesManId, time, title, description, date, lat, lng, client_email, client_first_name, client_last_name, client_phone, client_company, client_designation, client_adminId } = req.body
         let {data } = req.body
        
         try {
         let result = data.map(async ( val)=>{
    
                var obj = {
                    salesManId: val.salesManId,
                    date : val.date,
                    time : val.time,
                    title : val.title,
                    description: val.description
                }
                let checkClient = await user.findAll({
                    where: {
                        email: val.client_email
                    }
                })
    
                if (checkClient.length > 0) {
                    obj.clientId = val.clientId
                } else {
                    let createClient = await user.create({
                        email: val.client_email,
                        firstName: val.client_first_name,
                        lastName: val.client_last_name,
                        phone: val.client_phone,
                        designation: val.client_designation,
                        roleId: 3,
                        salesmanId: val.salesManId,
                        adminId: val.client_adminId,
                        companyId: val.client_company
                    })
                    
                    obj.clientId = createClient.id
                }
                let createMeeting = await meetings.create(obj)
    
                let userTaskTracking = await tracking.create({
                    userId: val.salesManId,
                    date: val.date,
                    latitude: val.lat,
                    longitude: val.lng,
                    meetingId: createMeeting.id,
                })
            })
                res.send({
                    code: 200,
                    message: 'Create Meeting',
                })
    
            } catch (error) {
                res.send({
                    code: 500,
                    message: 'Api Failed',
                    data: [error]
                })
            }

      

    },

}