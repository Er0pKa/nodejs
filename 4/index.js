const express = require('express'),
      bodyParser = require('body-parser'),
       templating = require('consolidate'),
      app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  res.render('index', {
    title: 'Привет, handlebars!'
  });
});

app.post('/', (req, res) => {
  console.log(req.body.number);
  res.send(req.body);
})

app.listen(8888);
