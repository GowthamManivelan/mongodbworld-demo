require('dotenv').config({ path: '../config/.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

app.use('/api/checkins', require('./routes/checkinRoutes'));
app.use('/api/session', require('./routes/sessionRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
