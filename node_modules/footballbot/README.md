# footballbot

A module to control the football bot for NodeBots of London's International NodeBots Day celebrations.

You should install the following sketch on the Dagu mini driver board:

```
const byte MOTOR_SPEED = 0xF0;
const byte MOTOR_DIRECTION = 0xF1;
const byte DIGITAL_WRITE = 0xF2;

void setup()
{
  Serial.begin(9600);

  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(13, OUTPUT);
}

void loop()
{
  if(Serial.available() == 3) {
    digitalWrite(13, HIGH);

    byte command = Serial.read();
    byte pin = Serial.read();
    byte value = Serial.read();

    if(command == MOTOR_SPEED) {
      analogWrite(pin, value);
    } else if(command == MOTOR_DIRECTION || command == DIGITAL_WRITE) {
      digitalWrite(pin, value);
    }
  }
}
```

Then execute a node script that looks something like:

```javascript
var FootballBot = require('footballbot')

var footballBot = new FootballBot('/dev/tty.linvor-DevB')
footballBot.on('ready', function() {
  var left = footballBot.attach(new FootballBot.Motor({
    pins: {
      pwm: 9,
      dir: 7
    }
  }))

  var right = footballBot.attach(new FootballBot.Motor({
    pins: {
      pwm: 10,
      dir: 8
    }
  }))

  this.repl.inject({
    left: left,
    right: right
  })

  // pull pin 13 high
  this.digitalWrite(13, this.HIGH)

  // turn both motors on
  left.start()
  right.start()

  setTimeout(function() {
    // turn left
    left.speed(255)
    right.speed(0)
  }, 1000)

  setTimeout(function() {
    // full reverse!
    left.reverse()
    left.speed(255)
    right.reverse()
    right.speed(255)
  }, 2000)

  setTimeout(function() {
    // stop
    left.stop()
    right.stop()
  }, 3000)
})

```

The `FootballBot.Motor` class supports a similar API to the Johnny-Five equivalent.
