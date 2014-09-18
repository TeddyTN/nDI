var _ = require('lodash'),
    FactoryWrapper = require('./factory_wrapper');

function ServiceWrapper(container, cls, args) {
  if (!_.isFunction(cls)) {
    throw new TypeError('The cls argument must be an function');
  }

  this._class = cls;

  FactoryWrapper.call(this, container, _.noop, args);
}

module.exports = ServiceWrapper;

ServiceWrapper.prototype = _.create(FactoryWrapper.prototype, {
  'constructor': ServiceWrapper,
  _createInstance: function() {
    this._instance = new this._wrapper();
  },
  _buildWrapper: function() {
    var me = this;
    this._wrapper = function() {
      var args = me._parseArguments(me._arguments);
      me._class.apply(this, args);
    };

    this._wrapper.prototype = _.create(this._class.prototype, {'constructor': this._wrapper});
  }
});
