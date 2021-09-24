// import hotelModel, { hotelApiFilters } from '../models/hotel-model';
var indexModel=require('../models/index-model');
module.exports = {
    indexPage:function(req, res, next) {
        if (req.session.searchHistory === undefined) {
            req.session.searchHistory = [];
        }
        res.render('index', { title: 'Bootel | Home page', layout :'layouts/main', searchHistory: req.session.searchHistory});
    },
};
