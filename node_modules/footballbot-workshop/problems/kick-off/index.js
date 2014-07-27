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
      
      var up = { name: 'up',
        ctrl: false,
        meta: false,
        shift: false,
        sequence: '\u001b[A',
        code: '[A'
      }

      var dn = { name: 'down',
        ctrl: false,
        meta: false,
        shift: false,
        sequence: '\u001b[B',
        code: '[B'
      }

      process.stdin.emit('keypress', {}, up)

      process.nextTick(function () {
        try {
          // motor should have been started, forwards
  
          var calledDir7 = false
          var calledDir8 = false
          var calledPwm9 = false
          var calledPwm10 = false
  
          for (var i = 0; i < sp.write.callCount; i++) {
            var args = sp.write.getCall(i).args[0]
            if (args[1] == 7 && args[2] == 0) calledDir7 = true
            if (args[1] == 8 && args[2] == 0) calledDir8 = true
            if (args[1] == 9) calledPwm9 = true
            if (args[1] == 10) calledPwm10 = true
          }
  
          expect(calledDir7, 'Did not set direction of left motor to forwards').to.be.true
          expect(calledDir8, 'Did not set direction of right motor to forwards').to.be.true
          expect(calledPwm9, 'Did not start left motor').to.be.true
          expect(calledPwm10, 'Did not start right motor').to.be.true
  
          sp.write.reset()
  
          process.stdin.emit('keypress', {}, dn)
  
          process.nextTick(function () {
            try {
              // motor direction should have been changed
              calledDir7 = false
              calledDir8 = false
    
              for (var i = 0; i < sp.write.callCount; i++) {
                var args = sp.write.getCall(i).args[0]
                if (args[1] == 7 && args[2] == 1) calledDir7 = true
                if (args[1] == 8 && args[2] == 1) calledDir8 = true
              }
    
              expect(calledDir7, 'Did not set direction of left motor to reverse').to.be.true
              expect(calledDir8, 'Did not set direction of right motor to reverse').to.be.true
    
              cb(true)
            } catch (er) {
              console.error(er)
              cb(false)
            }
          })

        } catch (er) {
          console.error(er)
          cb(false)
        }
      })
    } catch (er) {
      console.error(er)
      cb(false)
    }
  })
}