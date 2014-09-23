var _ = require('lodash'),
    errors = require('./error'),
    format = require('util').format,
    FactoryWrapper = require('./factory_wrapper');

function Container() {
    this._parameters = {};
    this._services = {};
    this._taggedServices = {};
}

module.exports = Container;

_.assign(Container.prototype, {
    get: function(id) {
        if (!this.has(id)) {
            throw new errors.NotDefinedError(format('Service "%s" not defined', id));
        }

        var service = this._services[id];

        return (service instanceof FactoryWrapper) ? service.getInstance() : service;
    },
    has: function(id) {
        return this._services.hasOwnProperty(id);
    },
    set: function(id, value, tags) {
      this._services[id] = value;

      if (_.isEmpty(tags)) {
          tags = [];
      } else if (!_.isArray(tags)) {
          tags = [tags];
      }

      var me = this;
      _.forEach(tags, function(tag) {
          if (!_.isString(tag)) {
              throw new TypeError('Server tags must be an string');
          }

          if (!_.has(me._taggedServices, tag)) {
              me._taggedServices[tag] = [];
          }

          me._taggedServices[tag].push(id);
      });
    },
    findTaggedServiceIds: function(name) {
        if (!_.has(this._taggedServices, name)) {
            return [];
        }

        return _.toArray(this._taggedServices[name]);
    },

    getParameter: function(name) {
        if (!this.hasParameter(name)) {
            throw new errors.NotDefinedError(format('Parameter "%s" not defined', name));
        }

        return this._parameters[name];
    },
    hasParameter: function(name) {
        return this._parameters.hasOwnProperty(name);
    },
    setParameter: function(name, value) {
        this._parameters[name] = value;
    }
});
