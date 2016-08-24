const express = require('express'),
      bodyParser = require('body-parser'),
      templating = require('consolidate'),
      app = express(),
      tasks = require('./modules/tasks'),
      config = require('./modules/config'),
      mysql = require('mysql'),      
      connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) console.error(err);
})
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
