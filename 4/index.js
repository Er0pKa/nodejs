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
