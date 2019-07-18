const jwt = require('jsonwebtoken');

module.exports = {
  sign : function(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
  },
  verify : function(token) {
    try {
      console.log(token)
      console.log(jwt.verify(token, process.env.JWT_SECRET))
      var decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded) {
        return decoded
      }
    } catch(err) {
      console.log('hmmmmmmm')
      throw {
        Status : 404,
        message : `Invalid Token`
      }
    }
  }
};
