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

// JWT VERIFICATION MIDDLEWARE
const verifyToken = (token, callback) => {
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, authData) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, authData);
      }
    });
  };

const authenticateToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
  
    if (bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      verifyToken(bearerToken, (err, authData) => {
        if (err) {
          res.status(403).json({message: err}); // Unauthorized
        } else {
          req.authData = authData;
          next(); // Lanjut ke handler berikutnya
        }
      });
    } else {
      res.status(403).json({message: "error"}); // Unauthorized
    }
  };
  


// USERS -- Dummies
app.get('/user', authenticateToken, (req, res) => {

    
    res.json({
        message: 'This is user page get request.'
    });
})

// REGISTER (kurang penggunaan akronim kota - atau gausah pakai aja, ya?)
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
        [newId, name, email, hashedPassword, city || null, address || null, phonenumber]);

        res.status(200).json({ message: 'Akun Berhasil Dibuat!'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error!' });
    }

    console.log(email);

})

// LOGIN
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

        // ROLE - harus dikonfig lagi sih wkwk
        const role = "student"

        const token = generateAccessToken({email, role});
        res.json({token: token});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error!' });
    }

})

app.post('/admin/login', authenticateToken, async (req, res) => {

  const token = req.headers['authorization'].split(' ')[1];

  try {

    const email = jwt.verify(token, process.env.TOKEN_SECRET).email;

    const [verify, error] = await db.execute('SELECT email FROM admin WHERE email = ?', [email]);

    if (email !== verify[0].email || error){
      res.status(400).json({error: 'Unauthorized'})
    }

    res.status(200).json({message: "Authorized"});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error!'});
  }

})

app.post('/getUsers', authenticateToken, async (req, res) => {

})

function generateAccessToken(email){
    return jwt.sign((email), process.env.TOKEN_SECRET, {
      expiresIn: '1d'
    });
}



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})