const router = require('express').Router()
const bucketShareController = require('../controllers/bucketShareController')
const { UploadToGCS, multer } = require('../middlewares/gcsHelper')

router.get('/', bucketShareController.findAll) //get all bucket
router.get('/:bucketId', bucketShareController.findOne) //get a bucket
router.post('/', multer.single('files'), UploadToGCS, bucketShareController.create) // create a bucket
router.patch('/:bucketId', bucketShareController.update) //update a bucket
router.delete('/:bucketId', bucketShareController.delete) //delete a bucket

module.exports = router