// import hotelModel, { hotelApiFilters } from '../models/hotel-model';
var bookModel = require('../models/book-model');
module.exports = {
    bookPage: function (req, res, next) {
        res.render('book', {
            title: 'Bootel | Booking',
            layout: 'layouts/main',
            status: req.query.status,
            bookId: req.query.bookId
        });
    }
};