var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
let settings ={methode:"get"};
cities = [{"id":3,"name":"Hammamet"},{"id":7,"name":"Nabeul"},{"id":8,"name":"Tunis"},{"id":9,"name":"Carthage"},{"id":11,"name":"Monastir"},{"id":12,"name":"Sousse"},{"id":13,"name":"Djerba"},{"id":14,"name":"Mahdia"},{"id":15,"name":"Gammarth"},{"id":16,"name":"Zarzis"},{"id":17,"name":"Port El Kantaoui"},{"id":18,"name":"Nefta"},{"id":19,"name":"Tozeur"},{"id":20,"name":"Tabarka"},{"id":30,"name":"Sidi Bou Said"},{"id":31,"name":"Kairouan"},{"id":32,"name":"Douz"},{"id":33,"name":"Kebilli"},{"id":34,"name":"Ksar Ghilane"},{"id":35,"name":"Matmata"},{"id":36,"name":"Tataouine"},{"id":37,"name":"Sfax"},{"id":38,"name":"Tamerza"},{"id":39,"name":"Skanes"},{"id":40,"name":"Skanes-Monastir"},{"id":41,"name":"Kelibia"},{"id":42,"name":"Ain Draham"},{"id":43,"name":"Korba"},{"id":44,"name":"Gafsa"},{"id":45,"name":"Metlaoui"},{"id":46,"name":"Bizerte"},{"id":102,"name":"Gabes"},{"id":103,"name":"Le Kef"},{"id":104,"name":"Zaghouan"},{"id":105,"name":"Douga"},{"id":106,"name":"Sbeitla"},{"id":124,"name":"Makthar"},{"id":125,"name":"Siliana"},{"id":126,"name":"Jendouba"},{"id":128,"name":"téboursouk"},{"id":129,"name":"Bèja"},{"id":130,"name":"El Fahes"},{"id":131,"name":"Kasserine"},{"id":177,"name":"Enfidha"},{"id":237,"name":"Medjez-el-Bab"},{"id":245,"name":"Medenine"},{"id":356,"name":"Hammam Bourguiba"},{"id":357,"name":"Korbous"},{"id":360,"name":"Kerkennah"},{"id":537,"name":"Gabes"},{"id":609,"name":"Sidi Bouzid"},{"id":621,"name":"El jem"},{"id":538,"name":"Borj Cédria"},{"id":638,"name":"Soliman"},{"id":639,"name":"Nefza"}];
var api_url_filter ='';
var api_url ='';
var searchCode='';
var api_url_filtred='';
/* GET users listing. */
router.get('/', function(req, res, next) {
    api_url ='https://api.voyages2000.com.tn/hotels/availability?'+'cityId='+req.query.cityId+'&checkin='+req.query.checkIn+'&checkout='+req.query.checkOut+'&pax='+req.query.pax;
    console.log(api_url);
    res.render('hotels', { title: 'Bootel | Hotels Search Results',layout :'layouts/main',cities:cities});
});
router.get('/api/Search',function(req, res) {  
    fetch(api_url, settings)
    .then(res => res.json())
    .then((json) => {
        searchCode=json.searchCode;
        api_url_filter='https://api.voyages2000.com.tn/hotels/filters/'+json.searchCode;
        res.send(json);
    });
});
router.get('/api/Filter',function(req, res) {  

    console.log("filterrrrr"+api_url_filter);
      fetch(api_url_filter, settings)
      .then(res => res.json())
      .then((json) => {
          api_url_filter='https://api.voyages2000.com.tn/hotels/filters/'+json.searchCode;
          res.send(json);
      });
  });

module.exports = router;
