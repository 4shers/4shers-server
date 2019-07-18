const router = require('express').Router()
const bucketShareController = require('../controllers/bucketShareController')
const { UploadToGCS, multer } = require('../middlewares/gcsHelper')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/public', bucketShareController.findAllPublic) //get all bucket //done
router.get('/getone/:bucketId', bucketShareController.findOne) //get a bucket //done

router.use('/',authentication)

router.get('/private', bucketShareController.findAllPrivate) //get all bucket //done
router.post('/', multer.single('files'), UploadToGCS, bucketShareController.create) // create a bucket //done
router.patch('/file/:bucketId', authorization, multer.single('files'), UploadToGCS, bucketShareController.updatefile) //update a bucket
router.patch('/nofile/:bucketId', authorization, bucketShareController.updatenofile) //update a bucket
router.delete('/:bucketId', authorization, bucketShareController.delete) //delete a bucket //done

module.exports = router