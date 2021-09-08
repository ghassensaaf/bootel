var express = require('express');
var router = express.Router();
cities = [{"id":3,"name":"Hammamet"},{"id":7,"name":"Nabeul"},{"id":8,"name":"Tunis"},{"id":9,"name":"Carthage"},{"id":11,"name":"Monastir"},{"id":12,"name":"Sousse"},{"id":13,"name":"Djerba"},{"id":14,"name":"Mahdia"},{"id":15,"name":"Gammarth"},{"id":16,"name":"Zarzis"},{"id":17,"name":"Port El Kantaoui"},{"id":18,"name":"Nefta"},{"id":19,"name":"Tozeur"},{"id":20,"name":"Tabarka"},{"id":30,"name":"Sidi Bou Said"},{"id":31,"name":"Kairouan"},{"id":32,"name":"Douz"},{"id":33,"name":"Kebilli"},{"id":34,"name":"Ksar Ghilane"},{"id":35,"name":"Matmata"},{"id":36,"name":"Tataouine"},{"id":37,"name":"Sfax"},{"id":38,"name":"Tamerza"},{"id":39,"name":"Skanes"},{"id":40,"name":"Skanes-Monastir"},{"id":41,"name":"Kelibia"},{"id":42,"name":"Ain Draham"},{"id":43,"name":"Korba"},{"id":44,"name":"Gafsa"},{"id":45,"name":"Metlaoui"},{"id":46,"name":"Bizerte"},{"id":102,"name":"Gabes"},{"id":103,"name":"Le Kef"},{"id":104,"name":"Zaghouan"},{"id":105,"name":"Douga"},{"id":106,"name":"Sbeitla"},{"id":124,"name":"Makthar"},{"id":125,"name":"Siliana"},{"id":126,"name":"Jendouba"},{"id":128,"name":"téboursouk"},{"id":129,"name":"Bèja"},{"id":130,"name":"El Fahes"},{"id":131,"name":"Kasserine"},{"id":177,"name":"Enfidha"},{"id":237,"name":"Medjez-el-Bab"},{"id":245,"name":"Medenine"},{"id":356,"name":"Hammam Bourguiba"},{"id":357,"name":"Korbous"},{"id":360,"name":"Kerkennah"},{"id":537,"name":"Gabes"},{"id":609,"name":"Sidi Bouzid"},{"id":621,"name":"El jem"},{"id":538,"name":"Borj Cédria"},{"id":638,"name":"Soliman"},{"id":639,"name":"Nefza"}];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'testing this',layout :'layouts/main',cities:cities});
});

module.exports = router;
