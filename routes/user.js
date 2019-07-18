const routes = require('express').Router()
const { ControllerUser } = require('../controllers');

routes.post('/signin', ControllerUser.signIn)
routes.post('/signup', ControllerUser.signUp)

module.exports = routes
