const jwt = require('jsonwebtoken');
const db = require('../../db');
const getEmail = require('../../function/getEmail')


const {generateAccessToken} = require('../../middleware/token')

let adminLogin = async (req, res) => {  
    try {
      const {email, password} = req.body;
      const [verify, error] = await db.execute('SELECT email FROM admin WHERE email = ?', [email]);
      

      if (verify.length <= 0){
        return res.status(401).json({alert: "Unauthorized"});
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