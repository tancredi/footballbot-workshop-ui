var FootballBot = require('footballbot')
var bot = new FootballBot('/dev/tty.HC-06-DevB')

bot.on('ready', function () {
  var left = new FootballBot.Motor({pins: {pwm: 9, dir: 7}})
  var right = new FootballBot.Motor({pins: {pwm: 10, dir: 8}})

  bot.attach(left)
  bot.attach(right)

  this.repl.inject({left: left, right: right})

  left.start()
  right.start()
})
