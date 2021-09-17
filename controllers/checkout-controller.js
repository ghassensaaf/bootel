// import hotelModel, { hotelApiFilters } from '../models/hotel-model';
var checkoutModel=require('../models/checkout-model');
var { randomBytes } = require('crypto');
module.exports = {
    checkoutPage:function(req, res, next) {
        pensionId=req.body.pensionId;
        searchCode=req.body.searchCode;
        hotelPic=req.body.hotelPic;
        csrf=req.body.csrf;
        res.render('checkout', { title: 'Bootel | checkout',layout :'layouts/main'});
    },
    checkRate:async function(req, res) {
        if(csrf === req.session.csrf){
            try {
                const rates     = await checkoutModel.checkRate(pensionId, searchCode);
                const ratesJSON = await rates.json();
                console.log(ratesJSON);
                res.render('partials/rates.ejs',{data: ratesJSON, pic: hotelPic});
            } catch (error) {
                res.send(error);
            }
        }
        else
        {
            res.send("<h3>Invalid request"+req.session.csrf+"</h3>");
        }   
    },
    // (titles, firstnames, lastnames, ages, searchCode, pensionId, remark, holder, rooms)
    book:async function(req, res){
        var titles=[], firstnames=[], lastnames=[], ages=[];
        var holder= [req.body.firstName, req.body.lastName];
        for(let i = 0; i < Number(req.body.rooms); i++){
            console.log(req.body["title_"+(i+1)]);
            titles.push(req.body["title_"+(i+1)]);
            firstnames.push(req.body["firstName_"+(i+1)]);
            lastnames.push(req.body["lastName_"+(i+1)]);
            ages.push(req.body["age_"+(i+1)]);
        }
        try {
            const book     = await checkoutModel.book(titles, firstnames, lastnames, ages, req.body.searchCode, req.body.pensionId,req.body.message, holder, rooms);
            const bookJSON = await book.json();
            console.log("hello");
            console.log(bookJSON);
            res.send(bookJSON);
        } catch (error) {
            res.send(error);
        }
    }
};
