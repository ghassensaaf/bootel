var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {  
    res.render('checkout', { title: 'Bootel | checkout',layout :'layouts/main'});
});

module.exports = router;
