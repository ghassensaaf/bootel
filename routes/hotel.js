var express = require('express');
var router = express.Router();
var hotelController = require("../controllers/hotel-controller");
router.get('/',  hotelController.hotelsPage);
router.get('/api/Search/:cityId/:checkIn/:checkOut/:pax/:hId',hotelController.getHotels);
router.get('/api/Filter/:searchCode',hotelController.getFilters);
router.get('/api/FiltredRes/:searchCode/:page/:price/:rtn/:brd/:thm/:srt',hotelController.filter);
module.exports = router;
