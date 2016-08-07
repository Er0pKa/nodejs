/*Сделать программу-анализатор игровых логов. В качестве
аргумента программа получает путь к файлу. Выведите игровую
статистику: общее количество партий, количество выигранных /
проигранных партий и их соотношение, максимальное число побед /
проигрышей подряд.*/

var argv = require('minimist')(process.argv.slice(2)),
     fs = require('fs');

console.dir(argv);

fs.readFile("gameLog.txt", function (err, data) {
  if (err) throw err;
  data.toString().map(function(num) {
    return num = num + "2";})
  console.log(data.toString());
  // console.log(typeof(data));
});
