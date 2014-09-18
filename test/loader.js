var assert = require("assert"),
    mocha = require('mocha'),
    describe = mocha.describe,
    it = mocha.it,
    format = require('util').format,
    path = require('path');

var nDI = require('..');

describe('Loader', function() {
  describe('#load', function() {
    var basePath = path.join(__dirname, 'data');

    it('should throw error when file not found', function() {
      var container = new nDI.Container(),
          loader = new nDI.Loader(container, basePath),
          file = 'nope.json';

      assert.throws(
        function() {
          loader.load(file);
        },
        nDI.Error.FileNotFoundError
      );
    });

    it('should throw error when file is not a json file', function() {
      var container = new nDI.Container(),
          loader = new nDI.Loader(container, basePath),
          file = 'test.js';

      assert.throws(
        function() {
          loader.load(file);
        },
        nDI.Error.InvalidFileError
      );
    });

    it('should throw error when parameter config are invalid', function() {
      var container = new nDI.Container(),
          loader = new nDI.Loader(container, basePath),
          file = 'test-invalid-parameters.json';

      assert.throws(
        function() {
          loader.load(file);
        },
        nDI.Error.InvalidConfigurationError
      );
    });

    it('should throw error when services are invalid', function() {
      var container = new nDI.Container(),
          loader = new nDI.Loader(container, basePath),
          file = 'test-invalid-services.json';

      assert.throws(
        function() {
          loader.load(file);
        },
        nDI.Error.InvalidConfigurationError
      );
    });

    it('should throw error when service config are invalid', function() {
      var container = new nDI.Container(),
          loader = new nDI.Loader(container, basePath),
          file = 'test-invalid-service.json';

      assert.throws(
        function() {
          loader.load(file);
        },
        nDI.Error.InvalidConfigurationError
      );
    });

    it('should load file without error', function() {
      var container = new nDI.Container(),
          loader = new nDI.Loader(container, basePath),
          file = 'test_empty.json';

      loader.load(file);
      assert.ok(true);
    });

    it('should container entries correct', function() {
      var container = new nDI.Container(),
          loader = new nDI.Loader(container, basePath),
          file = 'test.json',
          config = require('./data/' + file),
          Test = require('./data/test');

      loader.load(file);

      assert.strictEqual(container.getParameter('test.name'), config.parameters['test.name']);
      assert.strictEqual(container.get('test.class'), Test);
      assert.ok(container.get('test') instanceof Test);
      assert.ok(container.get('test.factory') instanceof Test);
    });
  });
});
