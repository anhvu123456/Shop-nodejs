const Cart = require("../models/cart");

exports.getIndexProducts = (req, res, next) => {
    var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
    res.render('index', {
        cartProduct: cartProduct
    });
}