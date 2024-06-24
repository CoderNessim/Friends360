const express = require('express');
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/createGroup', groupController.createGroup);

module.exports = router;
