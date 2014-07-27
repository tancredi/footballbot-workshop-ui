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

      var calledPwm9 = false
      var calledPwm10 = false

      for (var i = 0; i < sp.write.callCount; i++) {
        var args = sp.write.getCall(i).args[0]
        if (args[1] == 9) calledPwm9 = true
        if (args[1] == 10) calledPwm10 = true
      }

      expect(calledPwm9, 'Did not start left motor').to.be.true
      expect(calledPwm10, 'Did not start right motor').to.be.true

      cb(true)
    } catch (er) {
      console.error(er)
      cb(false)
    }
  })
}