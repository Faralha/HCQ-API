const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('dotenv').config();
const backend = require('./routes/backend');
const frontend = require('./routes/frontend');

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());
app.set('view engine','ejs');
app.use(express.static('public'));

// USE ROUTES
app.use(backend);
app.use(frontend);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})