const secret = process.env.SECRET_TOKEN
const User = require('../models/user');
const { sign, verify } = require('../helpers/token');

module.exports = (req, res, next) => {
  const token = req.headers.token
  if (!token) {
    throw {
      Status : 404,
      message : `Token Not Provided`
    }
  } else {
    const decoded = verify(token)
    User.findOne({
      _id : decoded.id
    })
    .then((found) => {
      req.decoded = decoded;
      req.loggedUser = found
      next()
    })
    .catch((err) => {
      throw {
        Status : 404,
        message : 'User Not Found || Auth Failed'
      }
    })
  }
}


