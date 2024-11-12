// backend/src/controllers/checkinController.js

// Sample function to handle a get request
exports.getCheckIns = (req, res) => {
    res.json({ message: 'Retrieved check-ins' });
};

// Sample function to handle a post request for new check-in
exports.createCheckIn = (req, res) => {
    const { attendeeID, location } = req.body;
    res.json({ message: `Check-in created for ${attendeeID} at ${location}` });
};

