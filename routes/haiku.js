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

    var modify = null;

    if(req.body.accepted) {
      modify = service.accept(req.params['id']);
    }
    else if(req.body.rejected) {
      modify = service.reject(req.params['id']);
    }
    else {
      res.send('Nothing changed.');
      return;
    }

    modify.then(function() {
        res.status(200).send('Modified.');
    })
    .catch(function(err) {
        if(err.forbidden) {
            res.status(403).send(err.msg);
        }
        else {
            res.status(500).send('Error.');
        }
    });

});

module.exports = router;
