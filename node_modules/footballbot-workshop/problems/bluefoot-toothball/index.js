var fs = require('fs')
var path = require('path')
var msee = require('msee')
var proxyquire = require('proxyquire')
var expect = require('chai').expect
var serialport = require('../../stubs/serialport')

exports.problem = msee.parseFile(path.join(__dirname, 'problem.md'))

exports.solution = msee.parse('Reference solution:\n```js\n' + fs.readFileSync(path.join(__dirname, 'solution.js')) + '\n```')

exports.verify = function (args, cb) {
  var solution = proxyquire(path.resolve(args[0]), {serialport: serialport})

  process.nextTick(function () {
    var sp = serialport.SerialPort.instances[0]

    try {
      expect(sp, 'No footballbot instance created').to.exist

      expect(sp.write.called, 'No call to digitalWrite made').to.be.true

      var writeArgs = sp.write.lastCall.args[0]

      expect(serialport.SerialPort.lastCall.args[0], 'Did not attempt to connect over bluetooth').to.not.equal('/dev/tty.SLAB_USBtoUART')

      expect(writeArgs[1], 'Did not write to correct pin').to.equal(13)
      expect(writeArgs[2], 'Did not write correct value').to.equal(1) // this.HIGH

      cb(true)
    } catch (er) {
      console.error(er)
      cb(false)
    }
  })
}