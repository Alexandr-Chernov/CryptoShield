const express = require('express'),
    app = express();
const path = require('path');

const HOST = 'localhost';
const PORT = 3001;

app.get('/api', (req, res) => {
    res.json({ message: "Hello from API!" });
});

app.get('/test', (req, res) => {
    res.json({ message: "Hello from TEST!" });
});

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`PORT: ${PORT}`);
});
