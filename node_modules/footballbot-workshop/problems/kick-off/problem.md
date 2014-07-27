# Kick Off

* Write some code to control your footballbot using the keyboard
* Use the `keypress` module `npm install keypress`
* Listen for input on stdin and respond to keypresses
* When the `up` key is pressed, change the direction to forwards
* When the `down` key is pressed, change the direction to backwards
* Remember to start the motor on the initial keypress!

## Listening for keypress

You can use the following boilerplate code to listen for keypress events:

```js
var keypress = require('keypress')

// make `process.stdin` begin emitting 'keypress' events
keypress(process.stdin)

// listen for the 'keypress' event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key)
  if (key && key.ctrl && key.name == 'c') {
    process.exit()
  }
})

process.stdin.setRawMode(true)
process.stdin.resume()
```

## Start the match

You should be able to drive your footballbot about the pitch. Once you've
completed this exercise, write some code to control steering, acceleration and
think about different methods you could use to control your footballbot.

## Hints

- `keypress` documentation: https://www.npmjs.org/package/keypress
