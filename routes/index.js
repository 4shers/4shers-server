const router = require('express').Router()
const bucketShareRoute = require('./bucketshareRoute')

router.use('/buckets', bucketShareRoute)

module.exports = router