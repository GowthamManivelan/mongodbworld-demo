const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Define a route to get session attendance
router.get('/', sessionController.getSessionAttendance);

// Define a route to create a session attendance record
router.post('/', sessionController.createSessionAttendance);

module.exports = router;

