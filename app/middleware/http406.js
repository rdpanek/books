var NotAcceptable = require(process.cwd() + '/lib/error').NotAcceptable;

module.exports = function() {
  return function(req, res, next){
    if (!req.accepts('json')) {
        return next(new NotAcceptable());
    }
    next();
  };
};
