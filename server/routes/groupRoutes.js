const express = require('express');
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/createGroup', groupController.createGroup);
router.post('/inviteToGroup', groupController.inviteToGroup);
router.get('/getGroups', groupController.getGroups);
router.delete(
  '/deleteGroup/:id',
  groupController.deleteGroupProtect,
  groupController.deleteGroup,
);
router.patch('/acceptInvite/:id', groupController.acceptInvite);
router.patch('/declineInvite/:id', groupController.declineInvite);
router.delete('/leaveGroup/:id', groupController.leaveGroup);
module.exports = router;
