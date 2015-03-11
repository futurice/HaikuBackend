var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') { return next(); }
    res.redirect('/login');
}

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
