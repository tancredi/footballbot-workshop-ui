var util = require('util'),
  EventEmitter = require('events').EventEmitter,
  Repl = require("./repl.js"),
  SerialPort = require("serialport").SerialPort,
  protocol = require('./protocol')

var FootballBot = function(port) {
  EventEmitter.call(this)

  this._serialPort = new SerialPort(port, {
    baudrate: 9600
  })
  this._serialPort.on('open', function() {

    this.repl = new Repl({
      'board': this
    })

    this.LOW = 0
    this.HIGH = 1

    this.emit('ready')
  }.bind(this))
}
util.inherits(FootballBot, EventEmitter)

FootballBot.prototype.attach = function(motor) {
  motor._serialPort = this._serialPort

  return motor
}

FootballBot.prototype.digitalWrite = function(pin, value, callback) {
  this._serialPort.write([protocol.DIGITAL_WRITE, pin, value], callback)
}

module.exports = FootballBot
