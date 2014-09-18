var format = require('util').format;

function TestService(name) {
  this._name = name;
}

module.exports = TestService;

TestService.prototype.sayHello = function() {
  return format('Hello %s!', this._name);
};
