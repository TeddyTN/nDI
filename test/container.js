var assert = require("assert"),
    mocha = require('mocha'),
    describe = mocha.describe,
    it = mocha.it;

var nDI = require('..');

describe('Container', function() {
  var serviceId = 'example.service',
      parameterName = 'example.test';

  describe('#get', function() {
    it('should throw error when service is not defined', function() {
      var container = new nDI.Container();

      assert.throws(
        function() {
          container.get(serviceId);
        },
        nDI.Error.NotDefinedError
      );
    });

    it('should return the same object', function() {
      var container = new nDI.Container(),
          service = {a: 1, b: 2};

      container.set(serviceId, service);
      assert.strictEqual(container.get(serviceId), service);
    });

    it('should call wrapped function', function(done) {
      var container = new nDI.Container(),
          service = new nDI.FactoryWrapper(container, function() { done(); });

      container.set(serviceId, service);
      container.get(serviceId);
    });
  });

  describe('#has', function() {
    it('should return false when service is not defined', function() {
      var container = new nDI.Container();

      assert.equal(container.has(serviceId), false);
    });

    it('should return true when service is not defined', function() {
      var container = new nDI.Container(),
          service = {a: 1, z: 26};

      container.set(serviceId, serviceId);

      assert.equal(container.has(serviceId), true);
    });
  });

  describe('#set', function() {
    it('should be throw an error on invalid tag config', function() {
      var container = new nDI.Container(),
          service = function() { return 'Hello World!'; };

      assert.throws(
        function() {
          container.set(serviceId, service, {a: 1});
        },
        TypeError
      )
    });
  });

  describe('#findTaggedServiceIds', function() {
    it('should return an empty array wehn no tagged services found', function() {
      var container = new nDI.Container(),
          tag = 'tag.example';

      var ids = container.findTaggedServiceIds(tag);

      assert.ok(Array.isArray(ids));
      assert.equal(ids.length, 0);
    });

    it('should return an array with service ids for tagged services', function() {
      var container = new nDI.Container(),
          service = function() { return 'Hello World!'; },
          tag = 'test.tag';

      container.set(serviceId, service, [tag]);

      var ids = container.findTaggedServiceIds(tag);

      assert.ok(Array.isArray(ids));
      assert.equal(ids.length, 1);
      assert.strictEqual(ids[0], serviceId);
    });
  });

  describe('#getParameter', function() {
    it('should throw error when parameter is not defined', function() {
       var container = new nDI.Container();

        assert.throws(
          function() {
            container.getParameter(parameterName);
          },
          nDI.Error.NotDefinedError
        );
    });

    it('should return the same value', function() {
      var container = new nDI.Container(),
          parameter = 'Hello World!';

      container.setParameter(parameterName, parameter);

      assert.strictEqual(container.getParameter(parameterName), parameter);
    });
  });

  describe('#hasParameter', function() {
    it('should return false when parameter is not defined', function() {
      var container = new nDI.Container();

      assert.equal(container.hasParameter(parameterName), false);
    });

    it('should return true when parameter is not defined', function() {
      var container = new nDI.Container(),
          parameter = 'Hello John!';

      container.setParameter(parameterName, parameter);

      assert.equal(container.hasParameter(parameterName), true);
    });
  });
});
