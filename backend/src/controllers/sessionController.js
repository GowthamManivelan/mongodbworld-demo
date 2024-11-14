// // Sample function to get session attendance
// exports.getSessionAttendance = (req, res) => {
//     res.json({ message: 'Retrieved session attendance' });
// };

// // Sample function to create a session attendance record
// exports.createSessionAttendance = (req, res) => {
//     const { sessionID, attendeeID, room } = req.body;
//     res.json({ message: `Session attendance created for ${attendeeID} in ${sessionID} at ${room}` });
// };

const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://mongodb:mongodb@mongodbworld.jgki4.mongodb.net/MongoDBWorld-NYC?retryWrites=true&w=majority&appName=MongoDBWorld');

exports.getLiveSessions = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('MongoDBWorld-NYC');
        const collection = db.collection('SessionDetails');
        
        // Fetch sessions with isLive: true, excluding txt_embedding
        const liveSessions = await collection.find({ isLive: true }, { projection: { txt_embedding: 0 } }).toArray();
        
        res.json(liveSessions);
    } catch (error) {
        console.error("Error fetching live sessions:", error);
        res.status(500).json({ error: 'Failed to fetch live sessions' });
    }
};

