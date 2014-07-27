#!/usr/bin/env node

var adventure = require('adventure')
var shop = adventure({name: 'footballbot workshop', fg: 'black', bg: 'green'})

var problems = [
  'Power On Self Test',
  'Bluefoot Toothball',
  'Construction Yard',
  'Kick Off'
]

problems.forEach(function (p) {
  shop.add(p, function () { return require('./problems/' + p.toLowerCase().replace(/ /g, '-')) })
})

// Explicit exit to break out of the repl
shop.on('pass', function () {
  setTimeout(function () {
    process.exit()
  }, 1000)
}).on('fail', function () {
  setTimeout(function () {
    process.exit(1)
  }, 1000)
})

shop.execute(process.argv.slice(2))