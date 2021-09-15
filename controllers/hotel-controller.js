// import hotelModel, { hotelApiFilters } from '../models/hotel-model';
var hotelModel=require('../models/hotel-model');
module.exports = {
    hotelsPage:function(req, res, next) {
        res.render('hotels', { title: 'Bootel | Hotels Search Results', layout :'layouts/main'});
    },
    getHotels:async function(req, res, nx){
        try {
            const hotels     = await hotelModel.hotelSearch(req.params.cityId, req.params.checkIn, req.params.checkOut, req.params.pax, req.params.hId);
            const hotelsJSON = await hotels.json();
            res.send(hotelsJSON);
        } catch (error) {
            res.send (error);
        }
    },
    getFilters:async function(req, res){
        try {
            const filters     = await hotelModel.hotelFilters(req.params.searchCode);
            const filtersJSON = await filters.json();
            res.send(filtersJSON);
        } catch (error) {
            res.send (error);
        }
    },
    filter:async function(req, res){
        try {
            const filtredRes     = await hotelModel.hotelFiltredResult(req.params.page, req.params.searchCode, req.params.price, req.params.rtn, req.params.brd, req.params.thm, req.params.srt);
            const filtredResJSON = await filtredRes.json();
            res.send(filtredResJSON);
        } catch (error) {
            res.send (error);
        }
    }
};
