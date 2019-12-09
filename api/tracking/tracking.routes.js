const express = require('express');
const router = express.Router();
const trackingController = require('./tracking.controller')

router.post('/insertTrackingData',trackingController.insertTrackingData)
router.post('/syncBulkTrackData',trackingController.syncBulkTrackData)

router.get('/getUserTrack/:userId/:date',trackingController.getUserTrack)
module.exports = router