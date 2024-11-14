MongoDB World Conference – Real-Time Event Management and Analytics
Overview
This project simulates a real-time event management platform for the MongoDB World Conference, showcasing MongoDB's advantages over PostgreSQL in handling high-throughput, document-heavy data. It tracks thousands of attendees moving through various conference activities, including check-in, session attendance, crowd density, and personalized recommendations.

The goal is to demonstrate MongoDB's strengths in data ingestion, schema flexibility, nested querying, time-series analytics, and personalized recommendations.

Key Features
Real-Time Check-In and Badge Scanning: Tracks attendee check-ins in real time with immediate updates using MongoDB Atlas Streams and Kafka.
Session Attendance Tracking: Efficiently tracks attendees' participation in different sessions.
Crowd Density Monitoring: Uses MongoDB's time-series collections to display attendee density across event zones.
Personalized Recommendations: Recommends sessions and vendor booths to attendees based on interests using MongoDB's vector search.
End-of-Conference Analytics: Aggregates and analyzes data to generate insights into attendee engagement, popular sessions, and movement patterns.
Prerequisites
MongoDB Atlas account with a database setup (free or paid)
Node.js (version 14 or higher)
NPM or Yarn (package managers)
Kafka (for streaming simulation) – ensure it’s set up and running locally or in the cloud
Chart.js for real-time chart visualization on the frontend
Project Structure
backend: Contains all server-side logic, including APIs, MongoDB integration, and Kafka streaming.
frontend: Contains the React application for UI, using Chart.js for live analytics.
Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/mongodb-world-conference.git
cd mongodb-world-conference
2. Set Up Environment Variables
Create a .env file in the backend/config directory and add the following:

bash
Copy code
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/MongoDBWorld-NYC?retryWrites=true&w=majority
KAFKA_BROKER=localhost:9092  # Replace with your Kafka broker's URL if not running locally
PORT=5000
Replace <username>, <password>, and <cluster> with your MongoDB Atlas credentials.

3. Install Dependencies
Backend
bash
Copy code
cd backend
npm install
Frontend
bash
Copy code
cd ../frontend
npm install
4. Run Kafka Locally (For Data Streaming)
If you're running Kafka locally, ensure it’s up and running. Kafka should have the following topics:

check-ins: For tracking attendee check-ins
session-attendance: For tracking session attendance
crowd-density: For tracking density across different zones
Create topics in Kafka if they’re not already set up:

bash
Copy code
kafka-topics --create --topic check-ins --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic session-attendance --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic crowd-density --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
5. Run the Backend Server
Open a terminal, navigate to the backend folder, and start the server:

bash
Copy code
npm start
This will start the server on http://localhost:5000.

6. Run the Frontend Client
Open another terminal, navigate to the frontend folder, and start the client:

bash
Copy code
npm start
The frontend should now be running on http://localhost:3000.

Usage
Real-Time Event Simulation
The backend generates simulated attendee check-ins, session attendance, and crowd density updates using Kafka. The MongoDB Atlas Streams listens to these Kafka topics, processes them in real time, and stores the data in MongoDB collections.

Accessing the UI
Check-In Count: Displays the real-time count of attendees who have checked in.
Session Attendance: Polar area chart showing real-time session attendance, with intensified color for updated sessions.
Crowd Density Heatmap: Displays density levels across different zones in real time.
Personalized Recommendations: Recommends sessions to attendees based on their interests using MongoDB vector search.
APIs
GET /api/checkins: Fetches the real-time check-in count.
GET /api/sessions/live: Fetches live session data for display.
GET /api/crowddensity: Fetches real-time crowd density data.
Technical Details
MongoDB Features
Atlas Streams: Used for real-time data ingestion from Kafka topics.
Document Model: Schema flexibility to adapt to dynamic event data.
Time-Series Collections: Efficient storage and retrieval for time-series data like crowd density.
Aggregation Pipelines: Real-time aggregation for end-of-conference analytics.
Vector Search: Provides personalized recommendations.
Kafka Streaming
Kafka serves as a data stream for simulating real-time events. Each attendee movement or session attendance event flows through Kafka topics, is processed, and then stored in MongoDB via Atlas Streams.

Chart.js Integration
The frontend uses Chart.js for visualizing session attendance and crowd density. The polar area chart highlights session popularity in real time by intensifying colors on update.

Commands Summary
Command	Description
npm start (backend)	Starts the backend server
npm start (frontend)	Starts the frontend client
kafka-topics --create ...	Creates a Kafka topic for simulation
mongosh	MongoDB CLI for manually checking data
Future Improvements
Enhanced Personalization: Leverage more user data to refine recommendations.
Scalability Testing: Simulate larger numbers of attendees to test MongoDB’s limits.
Real-Time Notifications: Notify users about session updates or popular events.
