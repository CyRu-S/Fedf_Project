const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.get('/conversations', auth(), chatController.getConversations);
router.get('/conversations/:id/messages', auth(), chatController.getMessages);
router.post('/conversations/:id/messages', auth(), chatController.sendMessage);

module.exports = router;
