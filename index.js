const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db.js');
var cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());

const {generateAccessToken, authenticateToken, verifyToken} = require('./middleware/token.js');


// ADMIN MIDDLEWARE
function isAdmin (req, res, next){
  const token = req.headers['authorization'].split(' ')[1];
  const adminToken = jwt.verify(token, process.env.TOKEN_SECRET);

  if(adminToken !== 'undefined'){
    if(adminToken.role === 'admin'){
      
      next();
    
    } else {
      res.status(400).json({message: "You're not an admin!"});
    }
  } else {
    res.status(400);
  }

}

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
        res.cookie(
          "api-auth", token,
          {
            expire: 360000 + Date.now(),
            httpOnly: true
          }
        );
        
        res.json({message: 'Authenticated.'})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error!' });
    }

})

// ADMIN LOGIN
app.post('/admin/login', authenticateToken, async (req, res) => {

  const token = req.headers['authorization'].split(' ')[1];

  try {

    const email = await jwt.verify(token, process.env.TOKEN_SECRET).email;

    const [verify, error] = await db.execute('SELECT email FROM admin WHERE email = ?', [email]);

    if (email !== verify[0].email || error || null){
      res.status(400);
    }

    const role = 'admin';
    const adminToken = generateAccessToken({email, role});
    res.send({token: adminToken});
    
  } catch (error) {
    console.error(error);
    res.status(500);
  }

})

app.get('/getUsers', async (req, res) => {
  const cookie = req.cookies['api-auth'];
  console.log(cookie);
  res.status(200).json({message: "Accessed."});
})





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})