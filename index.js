const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();
const index = require('./routes/index');
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
  }),
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// USE ROUTES
app.use(index);
app.use(frontend);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
