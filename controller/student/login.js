const db = require('../../db');
const bcrypt = require('bcrypt');
const {generateAccessToken} = require('../../middleware/token');

let login = async (req, res) => {
    const {email, password} = req.body;
        
        try {
            
            // CHECK IF THERE IS ANY EMAIL REGISTERED
            const checkEmail = await db.execute('SELECT email FROM student WHERE email = ?', [email]);
            if (checkEmail.length <= 0){
                return res.status(401).json({ error: 'Access Forbidden.'});
            }
            
            // CHECK IF PASSWORD MATCH
            const [emailPass] = await db.execute('SELECT password FROM student WHERE email = ?', [email]);
            const passwordMatch = await bcrypt.compare(password, emailPass[0].password);
    
            if(!passwordMatch){
                return res.status(401).json({ error: 'Access Forbidden.' });
            }
    
            // ROLE - by default role will be student
            const role = "student"
    
            const token = generateAccessToken({email, role});
            res.cookie(
              "api-auth", token,
              {
                expire: 360000 + Date.now(),
                httpOnly: true,
                secure: true
              }
            );
            
            res.json({message: 'Authenticated.'})
    
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error!' });
        }
}

module.exports = login;