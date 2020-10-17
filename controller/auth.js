
const passport = require('passport');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const randomstring = require('randomstring');
const { use } = require('passport');

exports.getLogin = (req, res, next) => {
        // var cartProduct;
        // if(!req.session.cart){
        //     cartProduct = null;
        // }else{
        //     var cart = new Cart(req.session.cart);
        //     cartProduct = cart.generateArray();
        // }
        const message = req.flash("error")[0];
        if(!req.isAuthenticated()){
            res.render('login',{
            title: 'Login',
            message: `${message}`,
            user: req.user
            });
            }
        else{
                res.redirect('/');
         }
 };

  
exports.getSignUp = (req, res, next) => {
    const message = req.flash("error")[0];
    // var cartProduct;
    // if(!req.session.cart){
    //     cartProduct = null;
    // }else{
    //     var cart = new Cart(req.session.cart);
    //     cartProduct = cart.generateArray();
    // }

    if(!req.isAuthenticated()){
        res.render('create-account', {
            title: 'Sinup',
            message: `${message}`,
            user: req.user         
        })
    }else{
        res.redirect('/');
    }

}
exports.postSignup = (req, res, next) => {
    passport.authenticate('local-signup', {
        successReturnToOrRedirect: "/verify-email",
        failureRedirect: "/create-account",
        failureFlash: true
    })(req, res, next);
};

exports.getVerifyEmail = (req, res, next) => {
    var transposter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dangvuanhdev.98@gmail.com',
            pass: 'tuyetvoicongavoi'
        }
    });
    User.findOne({username: req.user.username}).then(user => {
        var verification_token = randomstring.generate({
            length: 10
        });
        console.log(verification_token);

        var mailOption = {
            form: 'Admin',
            to: req.user.email,
            subject: "Test",
            text: 'token code',
            html: '<p>Cảm ơn đã đăng kí tài khoản của Bros shop. Mã kích hoạt của bạn là:</p>' +
            verification_token
        };

        transposter.sendMail(mailOption, (err, info) => {
            if(err){
                console.log(err);
            }else{
                console("Sent" + info.response);
            }
        });
        user.verify_token = verification_token;
        user.save();
    });

    const message = req.flash('error')[0];
    res.render('verify-email', {
        title: "Xác thực email",
        message: `${message}`,
        user:req.user
    }); 
};
exports.postVerifyEmail = (req, res, next) => {
    var token = req.body.token;
    User.findOne({ username: req.user.username}, (err, user) => {
        if(token === user.verify_token){
            user.isAuthenticated = true;
            user.save();
            return res.redirect('/login')
        }else if(token != user.verify_token){
            req.flash("error", "Mã xác thực không hợp lệ");
            return res.redirect('/verify-email');
        }
    })
}

exports.getForgotPass = (req, res, next) => {
    res.render('forgot-password');
}

exports.getChangePassword = (req, res, next) => {
    res.render('change-password');
}