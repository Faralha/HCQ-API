const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db.js');
var cookieParser = require('cookie-parser');
require('dotenv').config();
const index = require('./routes/index');

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());

// USE ROUTES
app.use(index)



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})