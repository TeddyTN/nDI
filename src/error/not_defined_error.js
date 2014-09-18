var nDIError = require('./ndi_error');

function NotDefinedError(message) {
  nDIError.call(this, message, NotDefinedError.name);
}

module.exports = nDIError.extend(NotDefinedError);
