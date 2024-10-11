const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

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
    /*
    const fs = require('fs');
    fs.appendFile('data.json', JSON.stringify(userData) + '\n', (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send({ message: "Failed to save data" });
        }
        res.status(200).send({ message: "Data saved successfully!" });
    });
    */

    res.status(200).send({ message: "Data saved successfully!" }); // Send a success response
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build'))); // Adjust path to the client build

// The "catchall" handler: for any request that doesn't match one above, send back the React app.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html')); // Serve index.html for any unmatched routes
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
