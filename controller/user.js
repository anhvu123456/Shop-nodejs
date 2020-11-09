const Users = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getAccount = (req, res, next) => {
    res.render('account');
}
s
exports.getAccountChange = (req, res, next) => {
    res.render('account-change-info');
}