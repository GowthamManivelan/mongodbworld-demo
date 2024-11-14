// backend/src/controllers/roleCountsController.js
require('dotenv').config({ path: '../../../config/.env' });
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://mongodb:mongodb@mongodbworld.jgki4.mongodb.net/MongoDBWorld-NYC?retryWrites=true&w=majority&appName=MongoDBWorld');
async function getRoleCounts (req, res)  {
    try {
        await client.connect();
        const db = client.db('MongoDBWorld-NYC');
        const collection = db.collection('RoleCounts');
        const roleCounts = await collection.find({}).toArray();
        res.json(roleCounts);
    } catch (error) {
        console.error("Error fetching role counts:", error);
        res.status(500).send("Error fetching role counts");
    }
};

module.exports = { getRoleCounts };