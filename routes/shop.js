const express = require('express');
var router = express.Router();
const productController = require('../controller/product');

router.get('/', productController.getIndexProducts);

module.exports = router;