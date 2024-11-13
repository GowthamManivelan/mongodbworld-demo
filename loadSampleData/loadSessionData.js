require('dotenv').config({ path: '../config/.env' });
const { MongoClient } = require('mongodb');


const sessions = [
    {
        "_id": "session-100",
        "title": "MongoDB World 2025  Kickoff",
        "description": "MongoDB World 2025 Kickoff brings together global innovators, developers, and data leaders to explore MongoDB’s latest advancements and transformative capabilities. Dive into expert-led sessions, hands-on workshops, and keynotes that reveal new possibilities in data management, real-time analytics, and AI integration. Join us to connect, learn, and shape the future of data with MongoDB",
        "time": "2024-11-12T10:30:00Z",
        "duration": "45 mins",
        "location": "Main Hall",
        "speaker": "Dev Ittycheria",
        "sessionType": "Live",
        "tags": ["executive summary", "keynote", "leadership"]
    },
    {
        "_id": "session-103",
        "title": "Introducing Mongo 8.0",
        "description": "Introducing MongoDB 8.0: the next evolution in data management, designed to deliver enhanced performance, expanded AI capabilities, and advanced security features for modern applications. Experience unprecedented flexibility and power as MongoDB 8.0 redefines what’s possible for developers and enterprises alike ",
        "time": "2024-11-12T10:30:00Z",
        "duration": "45 mins",
        "location": "Innovation Hub",
        "speaker": "Sahir Azam",
        "sessionType": "Live",
        "tags": ["executive summary", "keynote", "leadership", "MongoDB 8.0"]
    },
    {
        "_id": "session-101",
        "title": "Scaling MongoDB for High Availability",
        "description": "A deep dive into MongoDB's high availability features and scalability features, covering replica sets and sharding best practices in Mongo 8.0",
        "time": "2024-11-12T11:00:00Z",
        "duration": "45 mins",
        "location": "Schema Station",
        "speaker": "Matt Kalan",
        "sessionType": "Live",
        "tags": ["scaling", "availability", "MongoDB", "best practices"]
    },
    {
        "_id": "session-102",
        "title": "Entrance",
        "description": "Welcome drinks and guides",
        "time": "2024-11-12T8:30:00Z",
        "duration": "8 hours",
        "location": "Entrance",
        "speaker": "Volunteers",
        "sessionType": "Live",
        "tags": ["check-in", "entrance"]
    },
    {
        "_id": "session-111",
        "title": "Introduction to MongoDB Atlas",
        "description": "An overview of MongoDB Atlas, the fully managed cloud database service. Learn about setup, scaling, and monitoring.",
        "time": "2024-11-12T12:30:00Z",
        "duration": "45 mins",
        "location": "Index Hall",
        "speaker": "Blake Schoppa",
        "sessionType": "Live",
        "tags": ["MongoDB Atlas", "cloud", "scaling", "monitoring"]
    },
    {
        "_id": "session-104",
        "title": "Real-Time Analytics with Aggregations",
        "description": "Explore MongoDB's powerful aggregation framework for real-time analytics and data transformations.",
        "time": "2024-11-12T14:00:00Z",
        "duration": "50 mins",
        "location": "Latency Lounge",
        "speaker": "Paul Brant",
        "sessionType": "Live",
        "tags": ["real-time analytics", "aggregation", "data transformations"]
    },
    {
        "_id": "session-105",
        "title": "Building Secure Applications with MongoDB",
        "description": "Learn best practices for securing MongoDB applications, including encryption, authentication, and authorization.",
        "time": "2024-11-12T15:00:00Z",
        "duration": "60 mins",
        "location": "Schema Station",
        "speaker": "Wali Morris",
        "sessionType": "Live",
        "tags": ["security", "encryption", "authentication", "authorization"]
    },
    {
        "_id": "session-106",
        "title": "AI with MongoDB",
        "description": "MongoDB is introducing powerful set of new AI capabilities and we are also excited to announce new AI programs to help our customers build applications at scale",
        "time": "2024-11-12T16:30:00Z",
        "duration": "40 mins",
        "location": "AI Arena",
        "speaker": "Gowtham Manivelan",
        "sessionType": "Live",
        "tags": ["AI", "Vector Search", "Generative AI"]
    },
    {
        "_id": "session-107",
        "title": "Time Series Data in MongoDB",
        "description": "An introduction to storing and querying time series data in MongoDB, with practical examples and best practices.",
        "time": "2024-11-12T17:30:00Z",
        "duration": "45 mins",
        "location": "Distributed Deck",
        "sessionType": "Live",
        "speaker": "Cassiano Bein",
        "tags": ["time series", "data storage", "best practices"]
    },
    {
        "_id": "session-108",
        "title": "Distributed Systems and MongoDB",
        "description": "Understand how MongoDB operates as a distributed system and its benefits for resilience and fault tolerance.",
        "time": "2024-11-12T18:00:00Z",
        "duration": "60 mins",
        "location": "Distributed Deck",
        "sessionType": "Live",
        "speaker": "Brenden Apwisch",
        "tags": ["distributed systems", "resilience", "fault tolerance"]
    },
    {
        "_id": "session-110",
        "title": "Registration",
        "description": "Registration, checkins, swags, helpdesk.",
        "time": "2024-11-12T20:00:00Z",
        "duration": "8 hours",
        "location": "Registration",
        "speaker": "Volunteers",
        "tags": ["registration", "checkins", "badge scanning", "helpdesk"]
    }
 
];

const mongoClient = new MongoClient(process.env.MONGODB_URI);
console.log('MongoDB URI:', process.env.MONGODB_URI);


async function populateSessions() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db('MongoDBWorld-NYC'); 
        const collection = db.collection('SessionDetails'); 
        await collection.insertMany(sessions);
        console.log("Sessions collection populated successfully");
    } catch (error) {
        console.error("Error populating sessions collection:", error);
    } finally {
        await mongoClient.close();
    }
}

populateSessions();
