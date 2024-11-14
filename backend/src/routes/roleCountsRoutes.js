// backend/src/routes/roleCountsRoutes.js
const express = require('express');
const router = express.Router();
const roleCountsController = require('../controllers/roleCountsController');

router.get('/', roleCountsController.getRoleCounts);

module.exports = router;
