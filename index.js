const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());


// USERS -- Dummies
app.get('/user', (req, res) => {
    res.json({
        message: 'This is user page get request.'
    });
})

app.post('/register', (req, res) => {

    var { email, password, city, address, phonenumber } = req.body;

    console.log(email);

    res.json({
        message: `User ${email} has been registered!`
    })

})





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})