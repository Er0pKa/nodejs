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
      app = express();

app.engine('hbs', templating.handlebars);
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.get('/', (req, res) => {

  request({url:'http://4pda.ru/news/', encoding:null}, (error, response, html) => {
    if (!error && response.statusCode == 200){
      result = iconv.decode(new Buffer(html), 'win1251');
      const $ = cheerio.load(result);
      let titles = [],
          descriptions =[];
      $('.post').map(function(i, el) {
        titles[i] = $('[itemprop=name]').eq(i).text();
        descriptions[i] = $('[itemprop=description]').eq(i).text();
      });
      res.render('index', {
        title:'News',
        titles: titles
      });
    }
  })
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

app.listen(8888);
