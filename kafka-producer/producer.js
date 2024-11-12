require('dotenv').config({ path: '../config/.env' });
const { Kafka } = require('kafkajs');
const { logLevel } = require('kafkajs');
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

const producer = kafka.producer();

const produceMessages = async () => {
    await producer.connect();
    console.log('Connected to Kafka');

    setInterval(async () => {
        const checkInMessage = {
            attendeeID: `attendee-${Math.floor(Math.random() * 5000)}`,
            timestamp: new Date().toISOString(),
            location: ['Entrance', 'Lobby', 'Main Hall'][Math.floor(Math.random() * 3)],
        };

        await producer.send({
            topic: 'check-ins',
            messages: [{ value: JSON.stringify(checkInMessage) }],
        });
        console.log('Check-In Message Sent:', checkInMessage);
    }, 5000);

    setInterval(async () => {
        const sessionMessage = {
            sessionID: `session-${Math.floor(Math.random() * 100)}`,
            attendeeID: `attendee-${Math.floor(Math.random() * 5000)}`,
            timestamp: new Date().toISOString(),
            room: ['Room A', 'Room B', 'Room C'][Math.floor(Math.random() * 3)],
        };

        await producer.send({
            topic: 'session-attendance',
            messages: [{ value: JSON.stringify(sessionMessage) }],
        });
        console.log('Session Attendance Message Sent:', sessionMessage);
    }, 7000);
};

produceMessages().catch(console.error);
