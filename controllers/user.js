const User = require('../models/user');
const { compareHash } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

class ControllerUser {

  static signUp(req, res, next) {
    User.create(req.body)
    .then((created) => {
      res.status(201).json(created)
    })
    .catch(next)
  }

  static signIn(req, res, next) {
    User.findOne({
      email : req.body.email
    })
    .then((found) => {
      if (found) {
        if (compareHash(req.body.password, found.password)) {
          const token = jwt.sign({
            id: found._id,
            username: found.username,
            email : found.email
          }, process.env.JWT_SECRET);
          res.status(200).json({
            token
          })
        } else {
          throw {
            status : 401,
            message : 'Invalid Username or Password'
          }
        }
      } else {
        throw {
          status : 401,
          message : 'Invalid Username or Password'
        }
      }
    })
    .catch(next)
  }
}

module.exports = ControllerUser
