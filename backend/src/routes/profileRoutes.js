const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

router.get('/me', auth(), profileController.getMe);
router.patch('/me', auth(), profileController.updateMe);

module.exports = router;
