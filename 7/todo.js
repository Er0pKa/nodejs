const express = require('express'),
      templating = require('consolidate')
      app = express(),
      router = require('./router');

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(router);

app.listen(8888);
console.log('Server started');
