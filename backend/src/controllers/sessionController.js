// Sample function to get session attendance
exports.getSessionAttendance = (req, res) => {
    res.json({ message: 'Retrieved session attendance' });
};

// Sample function to create a session attendance record
exports.createSessionAttendance = (req, res) => {
    const { sessionID, attendeeID, room } = req.body;
    res.json({ message: `Session attendance created for ${attendeeID} in ${sessionID} at ${room}` });
};

