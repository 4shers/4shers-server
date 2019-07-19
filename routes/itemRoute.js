const router = require('express').Router()
const { authentication, itemAuthorization } = require('../middlewares/auth')
const itemRController = require('../controllers/itemController')
const { UploadToGCS, multer } = require('../middlewares/gcsHelper')

router.get('/', itemRController.findAll)
router.get('/search',itemRController.search)
router.get('/:itemId', itemRController.findOne)

router.use('/', authentication)

router.post('/', multer.single('filepath'), UploadToGCS, itemRController.create)
router.delete('/:itemId', itemAuthorization, itemRController.delete)


module.exports = router