var _ = require('lodash'),
    errors = require('./error');

function FactoryWrapper(container, fn, args) {
  if (!(container instanceof require('./container'))) {
    throw new TypeError('The container argument must be an instance of nDI.Container');
  }

  if (!_.isFunction(fn)) {
    throw new TypeError('The fn argument must be an function');
  }

  this._arguments = args;
  this._function = fn;
  this._container = container;

  this._buildWrapper();
}

module.exports = FactoryWrapper;

_.assign(FactoryWrapper.prototype, {
  _createInstance: function() {
    this._instance = this._wrapper();
  },
  _buildWrapper: function() {
    var me = this;
    this._wrapper = function() {
      var args = me._parseArguments(me._arguments);
      return me._function.apply(me._function, args);
    };
  },
  _parseArguments: function(args) {
    if (_.isEmpty(args)) {
      args = [];
    } else if (!_.isArray(args)) {
      args = [args];
    }

    var me = this;
    return _.map(args, function(arg) {
      if (!_.isString(arg)) {
        return arg;
      }

      switch(arg[0]) {
        case '@':
          return me._container.get(arg.substr(1));

        case '$':
          return me._container.getParameter(arg.substr(1));

        default:
          return arg;
      }
    });
  },
  getInstance: function() {
    if (!this._instance) {
      this._createInstance();
    }

    return this._instance;
  }
});
