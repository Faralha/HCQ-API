const jwt = require('jsonwebtoken');
const db = require('../db');


const {generateAccessToken} = require('../middleware/token')

let adminLogin = async (req, res) => {
    const token = req.cookies['api-auth'];
    console.log(token);
  
    try {
      const email = await jwt.verify(token, process.env.TOKEN_SECRET).email;
  
      const [verify, error] = await db.execute('SELECT email FROM admin WHERE email = ?', [email]);
  
      if (email !== verify[0].email || error || null){
        res.status(400);
      }
  
      const role = 'admin';
      const adminToken = generateAccessToken({email, role});
      res.cookie(
        "api-auth", adminToken,
        {
          expire: 360000 + Date.now(),
          httpOnly: true,
          secure: true
        }
      );

      res.status(200).json({message: "Authenticated."})
      
    } catch (error) {
      console.error(error);
      res.status(500);
    }
}

module.exports = adminLogin