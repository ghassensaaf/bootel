var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotelsRouter = require('./routes/hotels');
var hbs = require('hbs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.jsonObj = [{"id":1,"name":"Marhaba Hôtels"},{"id":2,"name":"El Mouradi Hôtels"},{"id":3,"name":"Thalassa Hôtels"},{"id":4,"name":"Yadis Hôtels"},{"id":5,"name":"Laico Hôtels"},{"id":6,"name":"Iberostar Hotels"},{"id":7,"name":"Dessole Hôtels"},{"id":8,"name":"Caribbean World"},{"id":9,"name":"Sentido"},{"id":10,"name":"Golden Tulip"},{"id":11,"name":"Mövenpick Hôtels"},{"id":12,"name":"Vincci Hôtels"},{"id":13,"name":"Radisson Blu"},{"id":14,"name":"Seabel Hotels"},{"id":15,"name":"Dar Ismail"},{"id":16,"name":"Houda Hôtels"},{"id":17,"name":"Magic Life Hôtels"},{"id":18,"name":"Golden Yasmine"},{"id":19,"name":"Concorde Hôtels"},{"id":20,"name":"Medina Hotels"},{"id":21,"name":"Bravo Hôtels"},{"id":22,"name":"Holiday inn"},{"id":23,"name":"Az Hotels"},{"id":24,"name":"Hasdrubal Hôtels"},{"id":25,"name":"Mercure"},{"id":26,"name":"Eden Hôtels"},{"id":27,"name":"Khayam Hôtels"},{"id":28,"name":"Novostar Hôtels"},{"id":29,"name":"Barcélo Hôtels"},{"id":30,"name":"TTS Hôtels"},{"id":31,"name":"One Hôtels & Resorts"},{"id":32,"name":"Miramar Hôtels"},{"id":33,"name":"Dar Jerba Hôtels"},{"id":34,"name":"SHDT Hôtels"},{"id":35,"name":"Hôtel Palace"}];
app.locals.accObj = [{"id":1,"name":"Hôtel"},{"id":2,"name":"Résidence"},{"id":3,"name":"Villa"},{"id":4,"name":"Campement"},{"id":5,"name":"Auberge"},{"id":6,"name":"Villa hôtelière"},{"id":7,"name":"Villa privative"},{"id":8,"name":"Maison d'hôte"}];
app.locals.boardObj = [{"id":1,"name":"Logement simple"},{"id":2,"name":"Petit Déjeuner "},{"id":3,"name":"Demi pension"},{"id":4,"name":"Pension complète"},{"id":5,"name":"Tout inclus"},{"id":6,"name":"Soft All Inclusive"},{"id":7,"name":"Ultra All Inclusive"},{"id":8,"name":"Pension complète à la carte"},{"id":9,"name":"Demi pension à la carte"},{"id":10,"name":"Formule prestige"},{"id":11,"name":"Demi pension +"},{"id":12,"name":"Pension complète +"},{"id":13,"name":"Les repas selon le programme"},{"id":14,"name":"Luxury All Inclusive"}];
app.locals.themesObj = [{"id":1,"name":"Tout inclus"},{"id":2,"name":"Balnéaire"},{"id":3,"name":"Luxe"},{"id":4,"name":"Famille"},{"id":5,"name":"Golf"},{"id":6,"name":"Romantique"},{"id":7,"name":"Hotel Club"},{"id":8,"name":"Affaire"},{"id":9,"name":"Wellness"},{"id":10,"name":"Aventure"},{"id":11,"name":"City Break"},{"id":12,"name":"Thalasso"},{"id":13,"name":"Spa"},{"id":14,"name":"Désert"},{"id":15,"name":"Noce"},{"id":16,"name":"Weekend"},{"id":17,"name":"Bon Plan"},{"id":18,"name":"Eco-friendly"},{"id":19,"name":"Nature"},{"id":20,"name":"Culture"},{"id":21,"name":"Découverte"},{"id":22,"name":"Héritage"},{"id":23,"name":"Jeunes"},{"id":24,"name":"Sénior"},{"id":25,"name":"Charme"},{"id":26,"name":"Oenologie & Gastronomie"},{"id":27,"name":"MICE"},{"id":28,"name":"Hajj"},{"id":29,"name":"Omra"},{"id":30,"name":"Plongée sous marine"},{"id":31,"name":"Ramadhan"},{"id":32,"name":"Religieux"},{"id":33,"name":"Thermalisme"},{"id":34,"name":"Esthétiques"},{"id":35,"name":"Mini-Croisière"},{"id":36,"name":"Adult only"},{"id":37,"name":"Chasse"},{"id":38,"name":"Pêche"},{"id":39,"name":"Gourmand"},{"id":40,"name":"Montagne"},{"id":41,"name":"Mono parental"},{"id":42,"name":"City Ville"},{"id":43,"name":"Insolites"},{"id":44,"name":"VIP"},{"id":45,"name":"Trekking"},{"id":46,"name":"Sports nautiques"},{"id":47,"name":"Sans alcool"},{"id":48,"name":"Coup de coeur"},{"id":49,"name":"Equitation"},{"id":50,"name":"Minceur"},{"id":51,"name":"Sport et Vitalité"},{"id":52,"name":"Maternité"},{"id":53,"name":"Beauté et Bien être"},{"id":54,"name":"Balnéo"},{"id":55,"name":"Equitation"},{"id":56,"name":"Mobilité réduite"},{"id":57,"name":"Concerts"},{"id":58,"name":"Football"},{"id":59,"name":"Tennis"},{"id":60,"name":"Fly & Drive"},{"id":61,"name":"Quad"},{"id":62,"name":"Kite-Windsurf"},{"id":63,"name":"Sport"},{"id":64,"name":"Evénements Spéciaux"},{"id":65,"name":"Toboggan"},{"id":66,"name":"Cyclisme"},{"id":67,"name":"Méharée"},{"id":68,"name":"Enfants"},{"id":69,"name":"Animation"}];
app.locals.cities = [{"id":3,"name":"Hammamet"},{"id":7,"name":"Nabeul"},{"id":8,"name":"Tunis"},{"id":9,"name":"Carthage"},{"id":11,"name":"Monastir"},{"id":12,"name":"Sousse"},{"id":13,"name":"Djerba"},{"id":14,"name":"Mahdia"},{"id":15,"name":"Gammarth"},{"id":16,"name":"Zarzis"},{"id":17,"name":"Port El Kantaoui"},{"id":18,"name":"Nefta"},{"id":19,"name":"Tozeur"},{"id":20,"name":"Tabarka"},{"id":30,"name":"Sidi Bou Said"},{"id":31,"name":"Kairouan"},{"id":32,"name":"Douz"},{"id":33,"name":"Kebilli"},{"id":34,"name":"Ksar Ghilane"},{"id":35,"name":"Matmata"},{"id":36,"name":"Tataouine"},{"id":37,"name":"Sfax"},{"id":38,"name":"Tamerza"},{"id":39,"name":"Skanes"},{"id":40,"name":"Skanes-Monastir"},{"id":41,"name":"Kelibia"},{"id":42,"name":"Ain Draham"},{"id":43,"name":"Korba"},{"id":44,"name":"Gafsa"},{"id":45,"name":"Metlaoui"},{"id":46,"name":"Bizerte"},{"id":102,"name":"Gabes"},{"id":103,"name":"Le Kef"},{"id":104,"name":"Zaghouan"},{"id":105,"name":"Douga"},{"id":106,"name":"Sbeitla"},{"id":124,"name":"Makthar"},{"id":125,"name":"Siliana"},{"id":126,"name":"Jendouba"},{"id":128,"name":"téboursouk"},{"id":129,"name":"Bèja"},{"id":130,"name":"El Fahes"},{"id":131,"name":"Kasserine"},{"id":177,"name":"Enfidha"},{"id":237,"name":"Medjez-el-Bab"},{"id":245,"name":"Medenine"},{"id":356,"name":"Hammam Bourguiba"},{"id":357,"name":"Korbous"},{"id":360,"name":"Kerkennah"},{"id":537,"name":"Gabes"},{"id":609,"name":"Sidi Bouzid"},{"id":621,"name":"El jem"},{"id":538,"name":"Borj Cédria"},{"id":638,"name":"Soliman"},{"id":639,"name":"Nefza"}];

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
