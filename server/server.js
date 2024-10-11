const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to handle data submission
app.post('/api/save-data', (req, res) => {
    const userData = req.body; // Get the user data from the request body
    console.log('Received data:', userData); // Log the received data for debugging

    // Here you can handle saving data to a database or any processing
    // For example, if you were saving to a JSON file, you could use:
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
