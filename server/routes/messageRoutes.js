const router = require('express').Router();
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.patch('/updatePermission', messageController.updatePermission);

module.exports = router;
