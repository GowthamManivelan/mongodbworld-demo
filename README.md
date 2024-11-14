# MongoDB World Conference – Real-Time Event Management and Analytics

📖 **Project Overview**

This project was built for the MongoDB hackathon to showcase MongoDB's real-time data processing capabilities in a high-throughput, document-heavy environment. The MongoDB World Conference platform simulates live attendee activity at a large-scale conference, demonstrating MongoDB’s advantages over PostgreSQL in data ingestion, schema flexibility, time-series analytics, and personalized recommendations.

---

✨ **Key Features**

- **Real-Time Check-In and Badge Scanning:** Live updates of attendee check-ins with real-time badge scanning.
- **Session Attendance Tracking:** Dynamic tracking of session participation with live attendee counts.
- **Crowd Density Analysis:** Displays real-time crowd density across event zones using MongoDB’s time-series collections.
- **Personalized Recommendations:** MongoDB’s vector search provides session and booth recommendations tailored to attendee interests.
- **Dynamic Schema Flexibility:** MongoDB’s flexible schema allows instant adaptation to new data requirements.

---

🛠 **Tech Stack**

- **Backend:** Node.js, Express, MongoDB Atlas, Kafka (for data streaming)
- **Frontend:** React, Chart.js for visualizations
- **Data Processing:** MongoDB Atlas Streams, Atlas Search, and time-series collections

---

🧩 **Architecture**

- **Data Simulation with Kafka:** Kafka streams simulated attendee data as if attendees were actively moving and checking into sessions.
- **Real-Time Data Processing with Atlas Streams:** The data is processed and aggregated in real-time.
- **Frontend Dashboard:** React frontend continuously polls the backend for updates, rendering live check-in data, session attendance, and crowd density analysis.

---

🚀 **Getting Started**

### Prerequisites

- **Node.js** (version >= 14)
- **MongoDB Atlas** account with a cluster set up
- **Kafka** setup for data streaming (e.g., Confluent Cloud or local Kafka)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/mongodb-world-conference
   cd mongodb-world-conference
Install dependencies

Backend:

bash
Copy code
cd backend
npm install
Frontend:

bash
Copy code
cd ../frontend
npm install
Configure Environment Variables

In the backend directory, create a config/.env file and add the following variables:

plaintext
Copy code
MONGODB_URI=your_mongodb_atlas_uri
KAFKA_BROKER=your_kafka_broker_uri
PORT=5000
Start Kafka (if using local setup)

Follow the Kafka documentation to start the Kafka broker and create the necessary topics for data streaming.

Run the Backend Server

bash
Copy code
cd backend
node src/server.js
Run the Frontend Application

bash
Copy code
cd ../frontend
npm start
🎬 Usage

Once both the frontend and backend are running:

Open a browser and go to http://localhost:3000.
You should see the conference dashboard with live updates on attendee counts, session participation, and crowd density.
Features in Action
Live Badge Scanning: Check-in counters update in real time.
Session Attendance Tracking: Visualize attendee distribution across sessions.
Crowd Density: See live attendee density across zones.
🎥 Demo

Watch the Demo Video (Link to video here)

📸 Screenshots

(Add screenshots or GIFs of the application here)
