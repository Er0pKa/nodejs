/*
Параметры подключения к БД вынести в модуль config.js
Использовать для работы с БД connectionPool
Реализовать методы редактирования и удаления записей.
Добавить опцию для указания приоритета задачи.
*/
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
  const duty = {1: 'eat',
                2: 'work',
                3: 'sleep',
                4: 'repeat';
  res.render('todo', {
    duty: duty
  });
});

app.post('/', (req, res) => {

});

app.listen(8888);
console.log('Server started');
