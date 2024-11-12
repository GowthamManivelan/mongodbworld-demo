const express = require('express');
const router = express.Router();
const checkinController = require('../controllers/checkinController');

router.get('/', checkinController.getCheckIns);
router.post('/', checkinController.createCheckIn);

module.exports = router;
