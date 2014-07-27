var util = require('util'),
  EventEmitter = require('events').EventEmitter,
  protocol = require('./protocol')

var Motor = function(options) {
  EventEmitter.call(this)

  this._options = options
  this._speed = 0
}
util.inherits(Motor, EventEmitter)

Motor.prototype.speed = function(speed, callback) {
  if(arguments.length == 0) {
    return this._speed
  }

  if(isNaN(parseInt(speed, 10))) {
    speed = 128
  } else if(speed > 255) {
    speed = 255
  } else if(speed < 0) {
    speed = 0
  }

  this._serialPort.write([protocol.MOTOR_SPEED, this._options.pins.pwm, speed], function() {
    if(this._speed == 0) {
      process.nextTick(this.emit.bind(this, 'start', null, new Date()))
    }

    this._speed = speed

    if(callback) {
      callback()
    }
  }.bind(this))

  return this
}

Motor.prototype.start = function() {
  return this.speed(128)
}

Motor.prototype.stop = function() {
  this.speed(0, function() {
    process.nextTick(this.emit.bind(this, 'stop', null, new Date()))
  }.bind(this))

  return this
}

Motor.prototype.fwd = Motor.prototype.forward = function() {
  this._serialPort.write([protocol.MOTOR_DIRECTION, this._options.pins.dir, 0])

  return this
}

Motor.prototype.rev = Motor.prototype.reverse = function() {
  this._serialPort.write([protocol.MOTOR_DIRECTION, this._options.pins.dir, 1])

  return this
}

Motor.prototype.resume = function() {
  return this.speed(this._speed)
}

module.exports = Motor
