require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const routes = require('./routes');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});