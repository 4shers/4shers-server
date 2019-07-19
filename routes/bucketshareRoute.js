const router = require('express').Router()
const bucketShareController = require('../controllers/bucketShareController')
const { UploadToGCS, multer } = require('../middlewares/gcsHelper')
const { authentication, bucketAuthorization } = require('../middlewares/auth')

router.get('/public', bucketShareController.findAllPublic) //get all bucket //done
router.get('/getone/:bucketId', bucketShareController.findOne) //get a bucket //done
router.get('/search',bucketShareController.search)

router.use('/',authentication)

router.get('/userBucket',bucketShareController.usersBucket)
router.get('/private', bucketShareController.findAllPrivate) //get all bucket //done

router.post('/', bucketShareController.create) // create a bucket //done

router.patch('/file/:bucketId',bucketAuthorization, bucketShareController.updatefile) //update a bucket with file
router.patch('/nofile/:bucketId', bucketAuthorization, bucketShareController.updatenofile) //update a bucket without file

router.delete('/:bucketId', bucketAuthorization, bucketShareController.delete) //delete a bucket //done

module.exports = router