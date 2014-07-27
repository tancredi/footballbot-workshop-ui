var FootballBot = require('footballbot')
var bot = new FootballBot('/dev/tty.HC-06-DevB')
var keypress = require('keypress')

bot.on('ready', function () {
  var left = bot.attach(new FootballBot.Motor({pins: {pwm: 9, dir: 7}}))
  var right = bot.attach(new FootballBot.Motor({pins: {pwm: 10, dir: 8}}))
  var motorsStarted = false

  function startMotors () {
    if (!motorsStarted) {
      left.start()
      right.start()
      motorsStarted = true
    }
  }

  keypress(process.stdin)

  process.stdin.on('keypress', function (ch, key) {
    if (!key) return;

    if (key.name == 'up') {
      left.forward()
      right.forward()
      startMotors()
    } else if (key.name == 'down') {
      left.reverse()
      right.reverse()
      startMotors()
    } else if (key.ctrl && key.name == 'c') {
      process.exit()
    }
  })

  process.stdin.setRawMode(true)
  process.stdin.resume()
})
