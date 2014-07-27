var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter
var sinon = require('sinon')

function SerialPort () {
  process.nextTick(function () {
    this.emit('open')
  }.bind(this))
}
inherits(SerialPort, EventEmitter)

SerialPort.prototype.write = function (arg, cb) {
  if (cb) process.nextTick(cb)
}

function createSpy (Constructor) {
  // Wrap methods with spies and store instances
  function SpyConstructor (opts) {
    Constructor.call(this, opts)

    // Spy on Constructor functions
    for (var key in this) {
      if (this[key] instanceof Function) {
        this[key] = sinon.spy(this[key])
      }
    }

    SpyConstructor.instances.push(this)
  }
  inherits(SpyConstructor, Constructor)

  // Copy keys from constructor onto the spy
  Object.keys(Constructor).forEach(function (key) {
    SpyConstructor[key] = Constructor[key]
  })

  SpyConstructor.instances = []

  return sinon.spy(SpyConstructor)
}

exports.SerialPort = createSpy(SerialPort)
exports['@global'] = true