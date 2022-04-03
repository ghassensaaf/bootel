var express = require('express');
var router = express.Router();

var bookController = require("../controllers/book-controller");
router.get('/',bookController.bookPage);

module.exports = router;

