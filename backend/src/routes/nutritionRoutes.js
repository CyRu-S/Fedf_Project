const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const nutritionController = require('../controllers/nutritionController');

router.get('/logs', auth(), nutritionController.getLogs);
router.post('/logs', auth(), nutritionController.saveDayLog);
router.delete('/logs/:date', auth(), nutritionController.deleteLog);

module.exports = router;
