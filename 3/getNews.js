/*
1) Создать программу для получения информации о последних
новостей с выбранного вами сайта в структурированном виде.
2) Создать переводчик слов с английского на русский, который будет
обрабатывать входящие GET запросы и возвращать ответы,
полученные через API Яндекс.Переводчика.
Ссылка для получения ключа API Яндекс.Переводчика:
http://api.yandex.ru/key/form.xml?service=trnsl
Документация API Переводчика:
http://api.yandex.ru/translate/doc/dg/reference/translate.xml
Пример GET запроса к API:
https://translate.yandex.net/api/v1.5/tr.json/translate?key={сюда-подставить-
ключ}&lang=ru-en
*/

const request = require('request'),
      cheerio = require('cheerio'),
      iconv = require('iconv-lite'),
      colors = require('colors');

request({url:'http://4pda.ru/news/', encoding:null}, (error, response, html) => {
  if (!error && response.statusCode == 200){
    result = iconv.decode(new Buffer(html), 'win1251');
    const $ = cheerio.load(result);
    $('.post').each(function(i, el) {
      console.log(i + $('[itemprop=name]').eq(i).text().green);
      console.log($('[itemprop=description]').eq(i).text());
      console.log(el);
    });
  }
})
