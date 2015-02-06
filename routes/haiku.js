var express = require('express');
var router = express.Router();

var service = require('../service/haiku');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('all haikus');//res.render('haiku_list');
});

router.post('/', function(req, res) {
  console.log(req.body);

  service.createHaiku({
      name:     req.body.name,
      email:    req.body.email,
      phone:    req.body.phone,
      haiku:    req.body.haiku
  }).then(function(result) {
      res.send(result);
  }).catch(function(err) {

      if(err.internal) {
          res.status(500).send(err.msg);
      }
      else if(err.invalid) {
          res.status(400).send(err.msg);
      }
      else {
          res.status(500).send(err);
      }

  });


});

module.exports = router;
