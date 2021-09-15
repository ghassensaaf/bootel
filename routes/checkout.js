var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {  
    test =[]; 
    if(typeof(req.body.pensionId)==="string"){
        test=JSON.parse(req.body.pensionId);
    }
    else{
        for(let i=0;i<req.body.pensionId.length;i++){
            test.push(JSON.parse(req.body.pensionId[i]));
        }
    }
    console.log(test);
    res.render('checkout', { title: 'Bootel | checkout',layout :'layouts/main'});
});

module.exports = router;
