var express = require('express');
var router = express.Router();

var service = require('../service/haiku');

/* GET users listing. */
router.get('/', function(req, res) {

    service.loadHaikus()
        .then(function(data) {
            res.send(data);
        });

});

router.post('/', function(req, res) {
        console.log(req.body);

    service.createHaiku({
        nick:     req.body.nick,
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
