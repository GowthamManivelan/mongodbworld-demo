// backend/src/controllers/locationDensityController.js
const { MongoClient } = require('mongodb');

// Connect to MongoDB
const client = new MongoClient('mongodb+srv://mongodb:mongodb@mongodbworld.jgki4.mongodb.net/MongoDBWorld-NYC?retryWrites=true&w=majority&appName=MongoDBWorld');


exports.getLocationDensity = async (req, res) => {
    try {
        await client.connect();
        const db = client.db('MongoDBWorld-NYC');
        const collection = db.collection('LocationDensity');

        // Fetch the latest location density data
        const densityData = await collection.find({}).toArray();

        res.json(densityData);
    } catch (error) {
        console.error('Error fetching location density data:', error);
        res.status(500).json({ error: 'Failed to fetch location density data' });
    }
};
