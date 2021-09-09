var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bootel | Home page',layout :'layouts/main'});
});

module.exports = router;
