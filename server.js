const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.static('public'));

app.use(require('./routes'));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', async (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});