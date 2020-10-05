

exports.getLogin = (req, res, next) => {
        res.render('login');
  };
  
exports.getSignUp = (req, res, next) => {
    res.render('create-account');
}

exports.getVerifyEmail = (req, res, next) => {
    res.render('verify-email');
}

exports.getForgotPass = (req, res, next) => {
    res.render('forgot-password');
}

exports.getChangePassword = (req, res, next) => {
    res.render('change-password');
}