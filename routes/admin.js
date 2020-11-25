const express = require('express');
var multer  = require('multer');
var router = express.Router();
const adminController = require('../controller/admin');
var upload = multer({ dest: './public/uploads/' });

router.get('/list-product', adminController.getProductAdmin);
router.get('/list-product/:page', adminController.getProductAdmin);
router.get('/product-show/:id', adminController.showProduct);
router.get('/create-product', adminController.getAddProduct);
router.post('/create-product', upload.single('images'), adminController.postSaveProduct);
router.get('/product-edit/:id', adminController.getEditProduct);
router.post('/update-product/:id',  adminController.updateProduct);
router.get('/upload-images/:id', adminController.getUploadImages);
router.post('/upload-images/:id', upload.single('images'), adminController.uploadImages);
router.get('/delete/:id',adminController.postDeleteProduct);

module.exports = router;