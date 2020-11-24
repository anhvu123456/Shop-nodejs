const Product = require("../models/product");
const User = require('../models/user');
const Cart = require("../models/cart");

exports.getProductAdmin = (req, res, next) => {
    var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  Product.find({}).exec(function(err, product){
    if(err){
      console.log("Err: "+ err )
    }else{
      res.render('list-product', {
        cartProduct: cartProduct,
        product: product
    });
    }
  })
    

}

exports.showProduct = (req, res, next) =>{
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  var id = req.params.id;
  Product.findById({_id: id}).exec(function(err, product){
    if(err){
      console.log("Err: " +err);
    }else{
      res.render('product-detail', {
        cartProduct: cartProduct,
        product: product
    });
    }
  })
}

exports.getAddProduct = (req, res, next) => {
    var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
    res.render('create-product', {
        cartProduct: cartProduct
    });
}

exports.postSaveProduct = (req, res, next) => {
   req.body.images = req.file.path.split('/').slice(1).join('/');
    console.log(req.body);
   var product = new Product(req.body);
   product.save(function(err){  
     if(err){
       console.log(err);
       res.redirect('/create-product')
     }else{
       console.log(product._id);
       res.redirect('/product-show/' + product._id)
     }
   })

}


exports.getEditProduct = (req, res, next) => {
    var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  Product.findOne({_id: req.prams.id}).exec(function(err, product){
    if(err){
      console.log("Err: " +err);
    }else{
      res.render('product-detail', {
        cartProduct: cartProduct,
        product: product
    });
    }
  }) 
}

exports.updateProduct = (req, res, next) => {
  var id = req.params.id;
  console.log(req.params.id);
  Product.findByIdAndUpdate({_id: id}, { $set: { name: req.body.name, description: req.body.description,
     price: req.body.price, size: req.body.size, productType: req.body.productType, color: req.body.color, pattern: req.body.pattern,
     tags: req.body.tags
     }}, { new: true }, function(err, product){
       if(err){
         console.log(product);
         res.redirect('/product-show/' + product._id);
       }
       res.redirect('/product-show/' + product._id);
     });
}
exports.getUploadImages = (req, res, next) => {
      var id = req.params.id;
      console.log(req.params.id);
      var cartProduct;
      if (!req.session.cart) {
        cartProduct = null;
      } else {
        var cart = new Cart(req.session.cart);
        cartProduct = cart.generateArray();
      }
      Product.findOne({_id: id}).exec(function(err, product){
        if(err){
          console.log("Err: " +err);
        }else{
          res.render('upload-images', {
            cartProduct: cartProduct,
            product: product
        });
        }
      }) 
  
}

exports.uploadImages = (req, res, next) => {
  var id = req.params.id;
  console.log(req.params.id);
  req.body.images = req.file.path.split('/').slice(1).join('/');
  Product.findByIdAndUpdate({_id: id}, { $set: { images: req.body.images
     }}, { new: true }, function(err, product){
       if(err){
         console.log(err);
       }
       res.redirect('/list-product');
     });
}
exports.postDeleteProduct = (req, res, next) => {
    Product.remove({_id: req.params.id}, function(err){
      if(err){
        console.log(err);
      }else{
        res.redirect('/list-product');
      }
    })
}