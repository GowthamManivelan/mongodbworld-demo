// backend/src/routes/locationDensityRoutes.js
const express = require('express');
const router = express.Router();
const { getLocationDensity } = require('../controllers/locationDensityController');

router.get('/density', getLocationDensity);

module.exports = router;

