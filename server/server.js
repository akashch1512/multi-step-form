const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to handle data submission
app.post('/api/save-data', (req, res) => {
    const userData = req.body; // Get the user data from the request body
    console.log('Received data:', userData); // Log the received data for debugging

    // Here you can handle saving data to a database or any processing
    res.status(200).send({ message: "Data saved successfully!" }); // Send a success response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
