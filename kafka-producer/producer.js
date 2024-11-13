require('dotenv').config({ path: '../config/.env' });
const { Kafka } = require('kafkajs');
const { MongoClient } = require('mongodb');
const { logLevel } = require('kafkajs');
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const kafka = new Kafka({
    clientId: 'conference-producer',
    brokers: [process.env.KAFKA_BROKER],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_API_KEY,
        password: process.env.KAFKA_API_SECRET,
    },
    connectionTimeout: 10000,
    requestTimeout: 30000,
    retry : {
       retries:10,
       initialRetryTime: 300,
    },
});
let attendees = [];
let sessionDetails = [];
const producer = kafka.producer();
const locationNames = ['Entrance', 'Registration', 'Main Hall','Innovation Hub', 'Schema Station', 'AI Arena', 'Latency Lounge', 'Distributed Deck', 'Shard Suite', 'Index Hall'];
async function fetchAttendees() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db('MongoDBWorld-NYC'); 
        const collection = db.collection('Attendee'); 
        attendees = await collection.find({}, { projection: { _id: 1 } }).toArray();
        attendees = attendees.map(attendee => attendee._id.toString()); // Extract only the IDs
        console.log('Fetched Attendees:', attendees);
    } catch (error) {
        console.error('Error fetching attendees:', error);
    }
}

async function fetchSessionDetails() {
    try {
        const db = mongoClient.db('MongoDBWorld-NYC'); // Replace with your DB name
        const collection = db.collection('SessionDetails'); // Replace with your session details collection name

        // Fetch all session details
        sessionDetails = await collection.find({}).toArray();
        console.log('Fetched Sessions:', sessionDetails);
    } catch (error) {
        console.error('Error fetching session details:', error);
    }
}

async function sendSessionMessages() {
    await producer.connect();

    setInterval(async () => {
        if (attendees.length === 0 || sessionDetails.length === 0) {
            console.warn('No attendees or sessions available for session messages.');
            return;
        }
        const liveSessions = sessionDetails.filter(session => session.isLive);
        // Randomly select a session and an attendee
        if (liveSessions.length > 0) {
            // Randomly select a live session and an attendee
            const selectedSession = liveSessions[Math.floor(Math.random() * liveSessions.length)];
            const selectedAttendee = attendees[Math.floor(Math.random() * attendees.length)];
        
            // Create a session attendance message with details from live session
            const sessionMessage = {
                sessionID: selectedSession._id,
                attendeeID: selectedAttendee,
                timestamp: new Date().toISOString(),
                location: selectedSession.location,
                topic: selectedSession.title,
                speaker: selectedSession.speaker,
                duration: selectedSession.duration,
                sessionType: selectedSession.sessionType,
                isLive: selectedSession.isLive,
                tags: selectedSession.tags
            };
            await producer.send({
                topic: 'session-attendance',
                messages: [{ value: JSON.stringify(sessionMessage) }],
            });
            console.log("Session Attendance Message Sent:", sessionMessage);
        } else {
            console.log("No live sessions available. Attendees will be redirected to general areas or notified.");
        }

    }, 7000);
}
async function sendCheckInMessages() {
    const locations = [
        'Entrance', 'Registration', 'Main Hall', 'Innovation Hub', 
        'Schema Station', 'AI Arena', 'Latency Lounge', 'Distributed Deck', 
        'Shard Suite', 'Index Hall'
    ];

    setInterval(async () => {
        if (attendees.length === 0) {
            console.warn('No attendees available for check-in messages.');
            return;
        }

        const checkInMessage = {
            attendeeID: attendees[Math.floor(Math.random() * attendees.length)],
            timestamp: new Date().toISOString(),
            location: locations[Math.floor(Math.random() * locations.length)]
        };

        await producer.send({
            topic: 'check-ins',
            messages: [{ value: JSON.stringify(checkInMessage) }],
        });
        console.log('Check-In Message Sent:', checkInMessage);
    }, 5000); // Adjust interval as needed
}
(async () => {
    await fetchAttendees(); 
    await fetchSessionDetails(); 
    await sendSessionMessages();
    await sendCheckInMessages();
})();


