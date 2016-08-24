const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      mysql = require('mysql'),
      config = require('./modules/config'),
      pool = mysql.createPool(config);

let duty = {}
    count = 0;

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res) => {
  console.log('get');
  pool.query('SELECT * FROM `tasks`', function(err, rows, fields) {
    if (err) console.log(err);
    const bigArr = rows[rows.length - 1].id;
    const smallArr = rows.length;
    let i = 0,
        j = 0;
    while (j < bigArr) {
      if (rows[i].id > j+1) {
        duty[j+1] = '';
      }
      else {
        duty[rows[i].id] = rows[i].description;
        i++;
      }
      j++;
    }
    console.log(duty);
    count = duty.length;
    res.render('todo', {
      duty: duty
    });
  });
});

router.post('/', (req, res) => {                    //add
  const post = {description: req.body.duty};
  pool.query('INSERT INTO tasks SET ?', post, (err) => {
    if (err) console.log(err);
    else res.redirect('/');
  });
  console.log('post: ' + count);
});

router.post('/update*', (req, res) => {             //change
  const index = +req.params[0].replace('/', '') + 1,
        action = req.body.update;
  console.log(action + ' ' + index);
  if ('change' == action) {
    // duty[index] = req.body.duty;
    const post = [req.body.duty, index];
    pool.query('UPDATE tasks SET description = ? WHERE id = ?', post, (err) => {
      console.log();
      if (err) console.log(err);
      else res.redirect('/');
    });

  }
  else if ('delete' == action) {
    // delete duty[index];
    // duty.splice(index, 1)
    pool.query('DELETE FROM tasks WHERE id = ?', index, (err, result) => {
      if (err) console.log(err);
      else res.redirect('/');
    });
  };
});
module.exports = router;
