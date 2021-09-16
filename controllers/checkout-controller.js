// import hotelModel, { hotelApiFilters } from '../models/hotel-model';
var checkoutModel=require('../models/checkout-model');
var { randomBytes } = require('crypto');
module.exports = {
    checkoutPage:function(req, res, next) {
        
        pensionId=req.body.pensionId;
        searchCode=req.body.searchCode;
        csrf=req.body.csrf;
        res.render('checkout', { title: 'Bootel | checkout',layout :'layouts/main'});
        
    },
    checkRate:async function(req, res) {
        if(csrf === req.session.csrf){
            console.log("truee");
            try {
                const rates     = await checkoutModel.checkRate(pensionId, searchCode);
                const ratesJSON = await rates.json();
                console.log(ratesJSON);
                res.render('partials/rates',{data: ratesJSON});
            } catch (error) {
                res.send(error);
            }
        }
        else
        {
            console.log("falsee");
            res.send("<h3>Invalid request</h3>")
        }
        
    }
};
