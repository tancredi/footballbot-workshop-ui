var repl = require("repl"),
  events = require("events"),
  util = require("util")

// Ported from
// https://github.com/rwaldron/johnny-five

function Repl(opts) {
  // Store context values in instance property
  // this will be used for managing scope when
  // injecting new values into an existing Repl
  // session.
  //this.context = {}
  this.ready = false

  process.stdin.resume()
  process.stdin.setEncoding("utf8")

  // Create a one time data event handler for initializing
  // the repl session via keyboard input
  //process.stdin.once("data", function() {
    var cmd, replDefaults

    console.info("Repl", "Initialized")

    replDefaults = {
      prompt: ">> ",
      useGlobal: false
    }

    // Initialize the REPL session with the default
    // repl settings.
    // Assign the returned repl instance to "cmd"
    cmd = repl.start(replDefaults)

    // Assign a reference to the REPL's "content" object
    // This will be use later by the Repl.prototype.inject
    // method for allowing user programs to inject their
    // own explicit values and reference
    this.context = cmd.context

    cmd.on("exit", function() {
      console.warn("Board", "Closing.")
      process.reallyExit()
    })

    //this.emit("ready")

    // Inject the "opts" object into the repl context
    this.inject(opts)

  //}.bind(this))
}
util.inherits(Repl, events.EventEmitter)

Repl.prototype.inject = function(obj) {
  for(var key in obj) {
    this.context[key] = obj[key]
  }
}

Repl.isActive = false
Repl.isBlocked = false

module.exports = Repl
