/*2) Создать переводчик слов с английского на русский, который будет
обрабатывать входящие GET запросы и возвращать ответы,
полученные через API Яндекс.Переводчика.
Ссылка для получения ключа API Яндекс.Переводчика:
http://api.yandex.ru/key/form.xml?service=trnsl
Документация API Переводчика:
http://api.yandex.ru/translate/doc/dg/reference/translate.xml
Пример GET запроса к API:
https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160810T160735Z.18697578f2121806.80f236aaa41fbae0a5fdb9e8f84c0bd3d00e8856&text=пчела&lang=ru-en
trnsl.1.1.20160810T160735Z.18697578f2121806.80f236aaa41fbae0a5fdb9e8f84c0bd3d00e8856
*/
const request = require('request'),
      http = require("http")
      url = require('url');

http.createServer(onRequest).listen(8889);        //server
console.log("Server has started.");

function toYandex(wrd) {                       //word to yandex
  var customUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160810T160735Z.18697578f2121806.80f236aaa41fbae0a5fdb9e8f84c0bd3d00e8856&text=' + wrd + '&lang=en-ru';
  request(customUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      json = JSON.parse(response.body).text.toString();
      return json;
    }
    else if (error) {
      return error
    }
  });
}

function onRequest(request, response) {           //main function
  const word = request.url.replace("/", "");
  const translatedWord = toYandex(word);
  console.log('word:' + word + '\ntranslate ' + translatedWord);

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Translator:" + word + "\n");
  response.write("Translate:" + translatedWord + typeof(translatedWord));
  response.end();
  request.setEncoding("utf8");
}
