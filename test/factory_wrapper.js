var assert = require("assert"),
    mocha = require('mocha'),
    describe = mocha.describe,
    it = mocha.it,
    format = require('util').format;

var nDI = require('..');

describe('FactoryWrapper', function() {
  describe('#constructor', function() {
    it('should be throw error on invalid container', function() {
      assert.throws(
        function() {
          new nDI.FactoryWrapper(null);
        },
        TypeError
      );
    });

    it('should be throw error on invalid function', function() {
      assert.throws(
        function() {
          new nDI.FactoryWrapper(new nDI.Container(), null);
        },
        TypeError
      );
    });
  });

  describe('#getInstance', function() {
    it('should be called on times', function() {
      var called = 0,
          container = new nDI.Container(),
          fn = function() {
            return ++called;
          },
          wrapper = new nDI.FactoryWrapper(container, fn);

      assert.strictEqual(wrapper.getInstance(), 1);
      assert.strictEqual(wrapper.getInstance(), 1);
    });

    it('should inject arguments', function() {
      var container = new nDI.Container(),
          parameterName = 'example.parameter',
          parameter = 'Hello World!',
          serviceId = 'example.service',
          service = {a: 1, b: 2},
          value = 123;

      container.setParameter(parameterName, parameter);
      container.set(serviceId, service);

      var fn = function(injectedParameter, injectedService, injectedValue) {
            assert.equal(arguments.length, 3);
            assert.strictEqual(injectedParameter, parameter);
            assert.strictEqual(injectedService, service);
            assert.strictEqual(injectedValue, value);
          },
          wrapper = new nDI.FactoryWrapper(container, fn, [format('$%s', parameterName), format('@%s', serviceId), value]);

      wrapper.getInstance();
    });

    it('should inject not array argument', function() {
      var container = new nDI.Container(),
          fn = function(injectedValue) {
            assert.equal(arguments.length, 1);
            assert.strictEqual(injectedValue, value);
          },
          value = 'Doh!',
          wrapper = new nDI.FactoryWrapper(container,fn, value);

      wrapper.getInstance();
    });
  });
});
