const router = require('express').Router()
const { authentication, itemAuthorization } = require('../middlewares/auth')
const itemRController = require('../controllers/itemController')
const { UploadToGCS, multer } = require('../middlewares/gcsHelper')

router.get('/', itemRController.findAll)
router.get('/:itemId', itemRController.findOne)
router.get('/',itemRController.search)

router.use('/', authentication)

router.post('/', multer.single('filepath'), UploadToGCS, itemRController.create)
router.delete('/:itemId', itemAuthorization, itemRController.delete)


module.exports = router