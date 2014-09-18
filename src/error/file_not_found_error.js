var nDIError = require('./ndi_error');

function FileNotFoundError(message) {
  nDIError.call(this, message, FileNotFoundError.name);
}

module.exports = nDIError.extend(FileNotFoundError);
