const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

router.get('/', auth(), notificationController.getSettings);
router.patch('/', auth(), notificationController.updateSettings);

module.exports = router;
