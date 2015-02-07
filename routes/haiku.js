var express = require('express');
var service = require('../service/haiku');
var router = express.Router();
var randtoken = require('rand-token');

/* GET users listing. */
router.get('/', function(req, res) {
    service.loadHaikus()
        .then(function(data) {
            res.send(data);
        });
});

router.post('/', function(req, res) {
    service.createHaiku({
        nick:     req.body.nick,
        email:    req.body.email,
        phone:    req.body.phone,
        haiku:    req.body.haiku,
        token:    randtoken.generate(16)
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

router.put('/:id', function(req, res) {
  if(req.body.accepted) {
      service.accept(req.param['id'])
          .then(function() {
              res.send(200);
          })
          .catch(function() {
              res.status(500).send('Error.');
          });
  }
  else {
      res.send('Nothing changed.');
  }
});

module.exports = router;
