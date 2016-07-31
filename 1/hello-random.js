var generator = require('random-password');
var colors = require('colors');
var beeper = require('beeper');

var min = 0,
  max = 20,
  message = generator(Math.floor(Math.random() * (max - min + 1)) + min);

console.log(message.random);
beeper('****-*-*'); // beep, beep, beep, beep, pause, beep, pause, beep 
