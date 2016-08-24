/*1) Создать на основе express и handlebars веб-сервис с HTML-
интерфейсом для динамической загрузки информации с одного из
нескольких сайтов в выбранном формате. Зайдя на этот сервис,
пользователь сможет с помощью формы настроить параметры
информационной подборки (например, количество отображаемых
новостей или их категорию) и получить ее в удобном виде. Форма
должна отправляться на сервер методом POST.
2) Реализовать запоминание с помощью cookie текущих настроек
формы и при заходе на сайт показывать последние использованные
настройки. Если cookie не существует, можно при отображении
формы дополнительно учитывать передаваемые GET-запросы
(например, ?count=10&lang=ru и т.д.)*/

const express = require('express'),
      request = require('request'),
      cheerio = require('cheerio'),
      iconv = require('iconv-lite'),
      templating = require('consolidate'),
      bodyParser = require('body-parser'),
      Cookies = require( "cookies" ),
      app = express();

app.engine('hbs', templating.handlebars);
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'hbs');

app.set('views', __dirname + '/views');
app.get('/', (req, res) => {
  res.render('index', {
    title:'News'
  });
});

app.post('/', (req, res) => {
  let count = req.body.number;

  request({url:'http://4pda.ru/news/', encoding:null}, (error, response, html) => {
    if (!error && response.statusCode == 200){
      const result = iconv.decode(new Buffer(html), 'win1251');
      const $ = cheerio.load(result);
      let titles = [];

      while (count > 0) {
        titles[count] = $('[itemprop=name]').eq(count).text();
        descriptions[count] = $('[itemprop=description]').eq(count).text();
        count--;
      }
      res.render('index', {
        title:'News',
        titles: titles
      });
    }
  })
});

app.listen(8888);
