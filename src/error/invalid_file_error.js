var nDIError = require('./ndi_error');

function InvalidFileError(message) {
  nDIError.call(this, message, InvalidFileError.name);
}

module.exports = nDIError.extend(InvalidFileError);
