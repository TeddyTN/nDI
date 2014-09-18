var nDIError = require('./ndi_error');

function InvalidConfigurationError(message) {
  nDIError.call(this, message, InvalidConfigurationError.name);
}

module.exports = nDIError.extend(InvalidConfigurationError);
