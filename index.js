const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();
const apiV1 = require('./routes/api/v1');
const frontend = require('./routes/frontend');

const port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a secret from your environment variables
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);

// USE ROUTES
app.use('/api/v1/', apiV1);
app.use(frontend);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
