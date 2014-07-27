var FootballBot = require('footballbot')
var bot = new FootballBot('/dev/tty.HC-06-DevB')

bot.on('ready', function () {
  this.digitalWrite(13, this.HIGH)
})