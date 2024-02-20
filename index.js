const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db.js');
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

// REGISTER (kurang di email kalau udah pernah pakai email yang sama.)
app.post('/register', async (req, res) => {

    var { email, name, password, city, address, phonenumber } = req.body;

    // BCRYPT PASSWORD HASH
    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        // CHECK IF EMAIL HAS BEEN USED
        const [similar] = await db.execute('SELECT email FROM student WHERE EMAIL = ?', [email]);
        if (similar.length > 0){
            return res.status(400).send({ message: 'Email sudah dipakai.' });
        }

        // SUFFIX NUMBER AUTO INCREMENT
        const [getId] = await db.execute('SELECT id FROM student ORDER BY id DESC LIMIT 1;');
        const getIdNumber = getId[0].id.split("-")[1];
        var lastId = parseInt(getIdNumber, 10);

        lastId++;

        // PREFIX 
        const role = 'S' // S for Student
        const city = 'JKT' // JKT for Jakarta as an example

        // NEW PRIMARY KEY
        let newId = role + city + '-' + lastId.toString().padStart(4, '0');

        await db.execute(`INSERT INTO student ( id, name, email, password, city, address, phonenumber) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [newId, name, email, hashedPassword, city, address, phonenumber]);

        res.status(200).json({ message: 'Akun Berhasil Dibuat!'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error!' });
    }

    console.log(email);

})

app.post('/login', async (req, res) => {

    const {email, password} = req.body;

    try {
        
        // CHECK IF THERE IS ANY EMAIL REGISTERED
        const checkEmail = await db.execute('SELECT email FROM student WHERE email = ?', [email]);
        if (checkEmail.length <= 0){
            return res.status(401).json({ error: 'Access Forbidden.'});
        }
        
        // CHECK IF PASSWORD MATCH
        const [emailPass] = await db.execute('SELECT password FROM student WHERE email = ?', [email]);
        console.log(emailPass[0].password);
        const passwordMatch = await bcrypt.compare(password, emailPass[0].password);

        if(!passwordMatch){
            return res.status(401).json({ error: 'Access Forbidden.' });
        }

        res.status(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error!' });
    }

})



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})