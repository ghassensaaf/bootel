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
                res.render('partials/rates.ejs',{data: ratesJSON, pic: hotelPic});
            } catch (error) {
                res.send(error);
            }
        }
        else
        {
            try {
                const rates     = await checkoutModel.checkRate(pensionId, searchCode);
                const ratesJSON = await rates.json();
                res.render('partials/rates.ejs',{data: ratesJSON, pic: hotelPic});
            } catch (error) {
                res.send(error);
            }
        }   
    },
    // (titles, firstnames, lastnames, ages, searchCode, pensionId, remark, holder, rooms)
    book:async function(req, res){
        var titles=[], firstnames=[], lastnames=[], ages=[];
        var holder={
            "title"     :req.body.title,
            "firstname" :req.body.firstName,
            "lastname"  :req.body.lastName,
            "email"     :req.body.email,
            "mobile"    :req.body.mobile
        };
        //  [req.body.firstName, req.body.lastName];
        for(let i = 0; i < Number(req.body.rooms); i++){
            if(typeof(req.body["title_"+(i+1)])==='string'){
                titles.push([req.body["title_"+(i+1)]]);
                firstnames.push([req.body["firstName_"+(i+1)]]);
                lastnames.push([req.body["lastName_"+(i+1)]]);
                ages.push([req.body["age_"+(i+1)]]);
            }
            else
            {
                titles.push(req.body["title_"+(i+1)]);
                firstnames.push(req.body["firstName_"+(i+1)]);
                lastnames.push(req.body["lastName_"+(i+1)]);
                ages.push(req.body["age_"+(i+1)]);
            }
        }
        
        try {
            // const book = await checkoutModel.book(titles, firstnames, lastnames, ages, req.body.searchCode, req.body.pensionId, req.body.message, holder, req.body.rooms);
            // const bookJSON = await book.json();
            // res.send(bookJSON);
            res.send(checkoutModel.book(titles, firstnames, lastnames, ages, req.body.searchCode, req.body.pensionId, req.body.message, holder, req.body.rooms));
        } catch (error) {
            res.send(error);
        }        
    }
};
