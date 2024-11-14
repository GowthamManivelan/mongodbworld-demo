require('dotenv').config({ path: '../config/.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mongodb:mongodb@mongodbworld.jgki4.mongodb.net/MongoDBWorld-NYC?retryWrites=true&w=majority&appName=MongoDBWorld', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

app.use('/api/checkins', require('./routes/checkinRoutes'));
app.use('/api/session', require('./routes/sessionRoutes'));
app.use('/api/rolecounts', require('./routes/roleCountsRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/session-analytics', require('./routes/sessionAnalyticsRoutes'));
app.use('/api/locationdensity', require('./routes/locationDensityRoutes'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
