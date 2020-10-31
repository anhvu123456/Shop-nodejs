
const passport = require('passport');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const randomstring = require('randomstring');
const { use } = require('passport');
const bcrypt = require('bcryptjs');
const { getMaxListeners } = require('../models/user');

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

 exports.postLogin = (req, res, next) => {
     passport.authenticate('local-signin', {
         successReturnToOrRedirect: '/',
         failureRedirect: '/login',
         failureFlash: true
     })(req, res, next)
 }

  
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

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
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
            pass: ''
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
    const message = req.flash('error')[0];
    res.render('forgot-password', {
        title: 'forgot password',
        message: `${message}`,
        user: req.user
    });
}

exports.postForgotPass = (req, res, next) => {
    const email = req.body.email;
    User.findOne({email: email}, (err, user) => {
        if(!user){
            req.flash("error", 'email invaild');
            return res.redirect("forgot-password");
        }else{
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: "dangvuanhdev.98@gmail.com",
                    pass: ''
                }
            });
            var tpass = randomstring.generate({
                length: 6
            });
            var mainOption = {
                from: 'Adim',
                to: email,
                subject: " Forgot password",
                text: "pass",
                html: "<p>Mật khẩu mới của bạn là:</p>" + tpass
            };
            transporter.sendMail(mainOption, (err, info) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(" Sent: "+info.response)
                }
            });
            bcrypt.hash(tpass, 12).then( hashPassword => {
                user.password = hashPassword;
                user.save();
            });
            res.redirect('/login');
        }
    })
}



exports.getChangePassword = (req, res, next) => {
    const message = req.flash("error")[0];
    res.render("change-password", {
        title: 'Đổi mật khẩu',
        message: `${message}`,
        user: req.user,
    });
}

exports.postChangePassword = (req, res, next) => {
    bcrypt.compare(req.body.oldpass, req.user.password, function(err, result){
        console.log('change password');
        if(!result){
            req.flash('error', "Mật khẩu cũ không đúng");
            return res.redirect("back");
        }else if(req.body.newpass != req.body.newpass2){
            console.log(req.body.newpass);
            console.logog(req.body.newpass2);
            req.flash("error", "Nhập lại mật khẩu không khớp");
            return res.render("back");
        }else{
            bcrypt.hash(req.body.newpass, 12).then(hashPassword => {
                req.user.password = hashPassword;
                req.user.save();
            })
            req.flash("success", "Đổi mật khẩu thành công");
            req.redirect("/account");
        }
    })
}