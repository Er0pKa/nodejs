/*
1) Создать программу для получения информации о последних
новостей с выбранного вами сайта в структурированном виде.
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
