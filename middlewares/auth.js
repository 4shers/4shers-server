const User = require('../models/user');
const bucketModel = require('../models/bucketShareModel')
const itemModel = require('../models/item')
const {
  sign,
  verify
} = require('../helpers/token');

module.exports = {
  authentication: (req, res, next) => {
    const token = req.headers.token
    if (!token) {
      throw {
        Status: 404,
        message: `Token Not Provided`
      }
    } else {
      const decoded = verify(token)
      User.findOne({
          _id: decoded.id
        })
        .then((found) => {
          req.decoded = decoded;
          req.loggedUser = found
          next()
        })
        .catch((err) => {
          throw {
            Status: 404,
            message: 'User Not Found || Auth Failed'
          }
        })
    }
  },
  bucketAuthorization: (req, res, next) => {
    let bucketId = req.params.bucketId
    let userId = req.loggedUser._id

    bucketModel
      .findById(bucketId)
      .then(result => {
        if (result) {
          if (result.author.toString() === userId.toString()) {
            next()
          } else {
            throw {
              status: 401,
              message: `Unauthorization access`
            }
          }
        } else {
          throw {
            status: 404,
            message: `Data Not found`
          }
        }

      })
      .catch(next)
  },
  itemAuthorization: (req, res, next) => {
    let itemId = req.params.itemId
    let userId = req.loggedUser._id

    itemModel
      .findById(itemId)
      .then(item => {
        if (item) {
          if (item.creator.toString() === userId.toString()) {
            next()
          } else {
            throw {
              status: 401,
              message: `Unauthorization access`
            }
          }
        } else {
          throw {
            status: 404,
            message: `Data Not found`
          }
        }
      })
      .catch(next)
  }
}