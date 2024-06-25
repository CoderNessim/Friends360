const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const factory = require('../controllers/handlerFactory');
const User = require('../models/userModel');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/confirmEmail/:token', authController.confirmEmail);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

//populate groups?
router.get('/getMe', userController.getMe, factory.getOne(User));

module.exports = router;
