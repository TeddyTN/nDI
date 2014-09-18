var _ = require('lodash');

function nDIError(message, name) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);

  this.message = message;
  this.name = name || nDIError.name;
}

function extend(child) {
  child.prototype = _.create(this.prototype, {'constructor': child});
  child.extend = extend;

  return child;
}

module.exports = extend.call(Error, nDIError);
