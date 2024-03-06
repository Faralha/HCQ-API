const jwt = require('jsonwebtoken');

const checkAuth = (req, res) => {
    try {
        const token = req.cookies['apiauth'];
        if(!token){
            return res.status(401);
        }

        res.status(200).json("Authenticated.");

    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = checkAuth