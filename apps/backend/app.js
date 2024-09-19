const express = require('express');
const bodyParser = require('body-parser');
const { getScores, addScore } = require('./controllers/scoreController');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/scores', getScores);
app.post('/scores', addScore);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
