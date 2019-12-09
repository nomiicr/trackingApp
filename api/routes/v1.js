var express = require('express');
var router = express.Router();
const admin = require('../../api/admin/admin.routes')
const user = require('../../api/user/user.routes')
const attendance = require('../../api/attendance/attendance.routes')
const task = require('../../api/task/task.routes')
const role = require('../../api/role/role.routes')
const client = require('../../api/client/client.routes')
const salesman = require('../../api/salesman/salesman.routes')
const tracking  = require('../../api/tracking/tracking.routes')
const rider  =require('../../api/rider/rider.routes')
const common  =require('../../api/common/common.routes')
const meeting = require('../../api/meeting/meeting.routes')
const company  = require('../../api/company/company.routes')



router.use('/api/admin', admin)
router.use('/api/user', user)
router.use('/api/task', task)
router.use('/api/attendance', attendance)
router.use('/api/tracking', tracking)
router.use('/api/role', role)
router.use('/api/client',client),
router.use('/api/salesman',salesman)
router.use('/api/tracking',tracking)
router.use('/api/rider',rider)
router.use('/api/common',common),
router.use('/api/meeting',meeting)
router.use('/api/company',company)


module.exports = router;