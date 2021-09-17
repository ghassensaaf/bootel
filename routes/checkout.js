var express = require('express');
var router = express.Router();

var checkoutController = require("../controllers/checkout-controller");
router.post('/',checkoutController.checkoutPage);
router.post('/checkRate',checkoutController.checkRate);
router.post('/book',checkoutController.book);
module.exports = router;

