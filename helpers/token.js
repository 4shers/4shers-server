const jwt = require('jsonwebtoken');

module.exports = {
  sign : function(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
  },
  verify : function(token) {
    try {
      const decoded = jwt.verify(token, secret);
      if (decoded) {
        return decoded
      }
    } catch(err) {
      throw {
        Status : 404,
        message : `Invalid Token`
      }
    }
  }
};
