var assert = require("assert"),
    mocha = require('mocha'),
    describe = mocha.describe,
    it = mocha.it,
    format = require('util').format;

var nDI = require('..');

describe('ServiceWrapper', function() {
  describe('#constructor', function() {
    it('should be throw error on invalid class', function() {
      assert.throws(
        function() {
          new nDI.ServiceWrapper(new nDI.Container(), null);
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
            this.id = ++called;
          },
          wrapper = new nDI.ServiceWrapper(container, fn);

      assert.strictEqual(wrapper.getInstance().id, 1);
      assert.strictEqual(wrapper.getInstance().id, 1);
    });

    it('should inject arguments', function() {
      var container = new nDI.Container(),
          parameterName = 'example.parameter',
          parameter = 'Hello World!',
          serviceId = 'example.service',
          service = {a: 1, b: 2},
          value = 'Doh!';

      container.setParameter(parameterName, parameter);
      container.set(serviceId, service);

      var fn = function(injectedParameter, injectedService, injectedValue) {
            assert.strictEqual(injectedParameter, parameter);
            assert.strictEqual(injectedService, service);
            assert.strictEqual(injectedValue, value);
          },
          wrapper = new nDI.ServiceWrapper(container, fn, [format('$%s', parameterName), format('@%s', serviceId), value]);

      wrapper.getInstance();
    });
  });
});
