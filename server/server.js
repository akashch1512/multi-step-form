const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/save-data', (req, res) => {
    const data = req.body;

    // Write data to a text file
    fs.appendFile(path.join(__dirname, 'data.txt'), JSON.stringify(data) + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
