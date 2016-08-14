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
      templating = require('consolidate'),
      app = express();

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.get('/', (req, res) => {
  res.render('hello', {
    title:'Привет, handlebars!'
  });
});

app.listen(8888);
