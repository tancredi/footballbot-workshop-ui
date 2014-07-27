# Construction Yard

* Assemble the rest of the footballbot using the instructional video:

> https://www.youtube.com/watch?v=pySuYOdplMY

* Write some code to spin the left and right motors

## Connecting the motors

The motors should be connected to the pins labelled **ML** and **MR**. They can be found at the bottom of the board.

A circuit diagram is available here:

> http://blog.dawnrobotics.co.uk/wp-content/uploads/2013/11/circuit_diagram.png

## Spinning the motors

Create new motor instances in your code and attach motors to your footballbot using the `attach` method:

```js
var FootballBot = require('footballbot')
var bot = new FootballBot('/dev/tty.HC-06-DevB')

bot.on('ready', function () {
  var motor = new FootballBot.Motor({pins: {pwm: 9, dir: 7}})
  bot.attach(motor)
})
```

* There are `start`, `stop` methods and one to set the `speed` (from 0 to 255)
* You can change the direction of the motor using `forward` and `reverse`
* Motors are event emitters and emit `start` and `stop` events

## Hints

* D7 controls the direction of the left motor
* D9 is the PWM pin for the left motor
* D8 controls the direction for the right motor
* D10 is the PWM pin for the right motor

## Components

* Motor - http://node-ardx.org/electronics-primer#dcmotor
