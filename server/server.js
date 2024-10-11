const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4452;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to handle data submission
app.post('/api/save-data', (req, res) => {
    const userData = req.body; // Get the user data from the request body
    console.log('Received data:', userData); // Log the received data for debugging
    res.status(200).send({ message: "Data saved successfully!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // This should be the output you see
});
