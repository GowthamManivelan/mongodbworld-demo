// backend/src/routes/sessionAnalyticsRoutes.js
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://mongodb:mongodb@mongodbworld.jgki4.mongodb.net/MongoDBWorld-NYC?retryWrites=true&w=majority&appName=MongoDBWorld');

router.get('/analytics', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('MongoDBWorld-NYC');
        const sessionAnalytics = await db.collection('SessionAnalytics').find().toArray();
        res.json(sessionAnalytics);
    } catch (error) {
        console.error('Error fetching session analytics:', error);
        res.status(500).json({ error: 'Failed to fetch session analytics' });
    }
});

module.exports = router;
