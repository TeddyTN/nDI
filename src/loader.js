var _ = require('lodash'),
    errors = require('./error'),
    FactoryWrapper = require('./factory_wrapper'),
    format = require('util').format,
    fs = require('fs'),
    path = require('path'),
    ServiceWrapper = require('./service_wrapper');

function Loader(container, basePath) {
  this._container = container;
  this._path = path.resolve(basePath);
}

module.exports = Loader;

_.assign(Loader.prototype, {
  _parseParameters: function(config) {
    if (_.isEmpty(config)) {
      return;
    }

    if (!_.isPlainObject(config)) {
      throw new errors.InvalidConfigurationError('Paramter definition must be an object');
    }

    var me = this;
    _.forOwn(config, function(value, name) {
      me._container.setParameter(name, value);
    });
  },
  _parseService: function(id, config) {
    if (!_.isPlainObject(config)) {
      throw new errors.InvalidConfigurationError(format('Service definition for "%s" must be an object', id));
    }

    if (config.id) {
      config.module = this._container.get(config.id);
    } else if (config.file) {
      config.module = require(path.join(this._path, config.file));
    }

    if ('class' === config.type) {
      this._container.set(id, config.module, config.tags);
    } else if ('instance' === config.type) {
      this._container.set(id, new ServiceWrapper(this._container, config.module, config['arguments']), config.tags);
    } else if ('factory' === config.type) {
      this._container.set(id, new FactoryWrapper(this._container, config.module, config['arguments']), config.tags);
    }
  },
  _parseServices: function(config) {
    if (_.isEmpty(config)) {
      return;
    }

    if (!_.isPlainObject(config)) {
      throw new errors.InvalidConfigurationError('Service config must be an object');
    }

    var me = this;
    _.forOwn(config, function(config, id) {
      me._parseService(id, config);
    });
  },
  load: function(file) {
    var filePath = path.join(this._path, file),
        message = format('Can not load file "%s", ', filePath);

    if (!fs.existsSync(filePath)) {
      throw new errors.FileNotFoundError(message + 'file not found');
    } else if (!filePath.match(/\.json$/i)) {
      throw new errors.InvalidFileError(message + 'file musst be an json file');
    }

    var config = require(filePath);
    this._parseParameters(config.parameters);
    this._parseServices(config.services);
  }
});
