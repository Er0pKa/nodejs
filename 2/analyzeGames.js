/*Сделать программу-анализатор игровых логов. В качестве
аргумента программа получает путь к файлу. Выведите игровую
статистику: общее количество партий, количество выигранных /
проигранных партий и их соотношение, максимальное число побед /
проигрышей подряд.*/

var argv = require('minimist')(process.argv.slice(2)),
     fs = require('fs'),
     attempts = 0,
     wins = 0,
     loses = 0,
     ratio = 0,
     winStreak = 1,
     loseStreak = 1,
     maxWinStreak = 0,
     maxLoseStreak = 0,
     recent = "";

console.dir(argv);

fs.readFile("gameLog.txt", function (err, data) {
  if (err) throw err;
  var parsedArr = data.toString().split("\r\n");

  parsedArr.forEach(function(item, i) {
    if (item == "win") {
      if (recent == "win") {
        winStreak++;
        if (maxWinStreak < winStreak) {
          maxWinStreak = winStreak;
        }
      }
      else {
        winStreak = 1;
      }
      wins++; attempts++; recent = "win";   //попытки тут чтобы не было строчек отличающихся от нужных
    }
    else if (item == "lose") {
      if (recent == "lose") {
        loseStreak++;
        if (maxLoseStreak < loseStreak) {
          maxLoseStreak = loseStreak;
        }
      }
      else {
        loseStreak = 1;
      }
      loses++; attempts++; recent = "lose";
    }

    // console.log(maxWinStreak, winStreak, recent); //Debug

  });

  ratio = wins/loses;

  console.log("attempts = " + attempts);
  console.log("wins = " + wins);
  console.log("loses = " + loses);
  console.log("ratio of wins/loses = " + ratio);
  console.log("max winstreak = " + maxWinStreak);
  console.log("max losestreak = " + maxLoseStreak);
});
