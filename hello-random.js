var generator = require('random-password');
var colors = require('colors');
var scribble = require('scribbletune');

var min = 0,
  max = 20,
  message = generator(Math.floor(Math.random() * (max - min + 1)) + min),
  clip = scribble.clip({
  notes: scribble.scale('c', 'major', 3), // this works too ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3']
    pattern: 'x_x_x_x_x_x_x_x_'
  });

console.log(message.random);
scribble.midi(clip, 'cscale.mid');
