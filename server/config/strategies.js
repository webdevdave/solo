var config = require('../config/config');
var User = require('../users/userModel');
var GoogleUser = require('../users/googleUserModel');

module.exports = {
  jwtOpts: {
    secretOrKey: config.tokenSecret,
    algorithms: 'HS256',
    authScheme: 'Bearer',
    passReqToCallback: false
  },

  jwtAuth: function(payload, next) {
    if (payload.type === 'JWT') {
      User.findOne({username: payload.user}, function(err, user) {
        if (err) return next(err, false);

        user ? next(null, user) : next(null, false);
      });
    } else if (payload.type === 'google') {
      GoogleUser.findOne({google: payload.user}, function(err, user) {
        if (err) return next(err, false);

        user ? next(null, user) : next(null, false);
      });
    }
  }
};
