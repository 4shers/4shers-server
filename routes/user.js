const router = require('express').Router()
const { ControllerUser } = require('../controllers');

router.post('/signin', ControllerUser.signIn)
router.post('/signup', ControllerUser.signUp)

module.exports = router
