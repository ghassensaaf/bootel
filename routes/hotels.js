var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
let settings ={methode:"get"};
var api_url_filter ='';
var api_url ='';
var searchCode='';
var api_url_filtred='';
/* GET users listing. */
router.get('/', function(req, res, next) {  
    res.render('hotels', { title: 'Bootel | Hotels Search Results',layout :'layouts/main'});
});
router.get('/api/Search/:cityId/:checkIn/:checkOut/:pax/:hId',function(req, res) {  
    api_url ='https://api.voyages2000.com.tn/hotels/availability?'+'cityId='+req.params.cityId+'&checkin='+req.params.checkIn+'&checkout='+req.params.checkOut+'&pax='+req.params.pax;
    if(req.params.hId !== 'x')
    {
      api_url+='&hotelId='+req.params.hId;
    }
    fetch(api_url, settings)
    .then(res => res.json())
    .then((json) => {
        res.send(json);
    });
});
router.get('/api/Filter/:searchCode',function(req, res) {  
    api_url_filter='https://api.voyages2000.com.tn/hotels/filters/'+req.params.searchCode;
      fetch(api_url_filter, settings)
      .then(res => res.json())
      .then((json) => {
          res.send(json);
      });
});
router.get('/api/FiltredRes/:searchCode/:page/:price/:rtn/:brd/:thm/:srt',function(req, res) {  
    api_url_filtred='https://api.voyages2000.com.tn/hotels/page/'+req.params.page+'/'+req.params.searchCode+'?1=1';
    if(req.params.price !== 'x'){
      api_url_filtred+='&minP=1&maxP='+req.params.price;
    }
    if(req.params.rtn !== 'x'){
      api_url_filtred+='&rating='+req.params.rtn;
    }
    if(req.params.brd !== 'x'){
      api_url_filtred+='&boards='+req.params.brd;
    }
    if(req.params.thm !== 'x'){
      api_url_filtred+='&themes='+req.params.thm;
    }
    if(req.params.srt !== 'x'){
      api_url_filtred+='&sort='+req.params.srt;
    }
    console.log("filtred resultes"+api_url_filtred);
      fetch(api_url_filtred, settings)
      .then(res => res.json())
      .then((json) => {
          res.send(json);
    });
});
module.exports = router;
