const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const userController = require('../controller/user')

router.get("/login",authController.getLogin)
router.get("/create-account", authController.getSignUp);
router.post('/create-account', authController.postSignup);
router.get("/account", userController.getAccount);
router.get("/account-change-info", userController.getAccountChange);
router.get("/verify-email", authController.getVerifyEmail);
router.post("/verify-email", authController.postVerifyEmail);
router.get("/forgot-password", authController.getForgotPass);
router.get("/change-password", authController.getChangePassword);

module.exports = router;