/*Написать консольную игру "Орел или решка", в которой надо будет
угадывать выпадающее число (1 или 2). В качестве аргумента
программа может принимать имя файла для логирования
результатов каждой партии. В качестве более продвинутой версии
задания можете реализовать простейшую версию игры Blackjack.*/

var min = 1, max = 2,
    fs = require('fs'),
    filename = "gameLog.txt",
    flipCoin = Math.floor(Math.random() * (max - min + 1)) + min,
    readline = require('readline'),
    result = "lose \n",
    rl = readline.createInterface({
      input: process.stdin, // ввод из стандартного потока
      output: process.stdout // вывод в стандартный поток
    });

binaryToName = (binary) => {
  if (1 == binary) { return "Орёл."; }
  else if (2 == binary) { return "Решка."; }
  else { return "не правильный ввод!" };
}

verdict = (answer) => {
  console.log('Монетка упала. ' + binaryToName(result));
  if (answer == flipCoin) {
    console.log("Угадал!");
    result = "win \n";
  }
  else {
    console.log("Не повезло.");
  }
};

log =(verdict) => {
  fs.exists(filename,function(err, data){
    if (!err) { //Если нет файла, то создаю новый
      fs.writeFile(filename, verdict,[],function (error) {
        if (error) throw error;
      })
    }
    else {
      fs.appendFile(filename, verdict, [], function (error) {
        if (error) throw error;
      })
    }
  })
}

rl.question('Орёл(1) или решка(2)?', function(answer) {
  console.log('Ты выбрал: ' + answer + ' - это ' + binaryToName(answer));
  verdict(answer);
  rl.close();
  log(result);
});
