// import hotelModel, { hotelApiFilters } from '../models/hotel-model';
var checkoutModel=require('../models/checkout-model');
module.exports = {
    checkoutPage:function(req, res, next) {
        pensionId=req.body.pensionId;
        searchCode=req.body.searchCode;
        res.render('checkout', { title: 'Bootel | checkout',layout :'layouts/main'});
    },
    checkRate:async function(req, res) {
        try {
            const rates     = await checkoutModel.checkRate(pensionId, searchCode);
            const ratesJSON = await rates.json();
            res.render('partials/rates',{data: ratesJSON});
        } catch (error) {
            res.send(error);
        }
    }
};
