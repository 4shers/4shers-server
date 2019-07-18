const router = require('express').Router()
const bucketShareRoute = require('./bucketshareRoute')
const itemRoute = require('./itemRoute')
const user = require('./user');

router.use('/users', user)
router.use('/buckets', bucketShareRoute)
router.use('/items', itemRoute)

module.exports = router