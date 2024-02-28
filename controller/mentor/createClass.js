const db = require('../../db');
const getNameFromEmail = require('../../function/getNameFromEmail')
const getEmail = require('../../function/getEmail');

const createClass = async (req, res) => {
    try {
        const {subClass, shortRegion} = req.body;
        
        const token = req.cookies['api-auth'];
        const email = getEmail(token);
        const {name} = await getNameFromEmail(email, 'mentor');

        console.log(name);

        // Design Database dlu many-to-many ;) anjdnawjnkajw

        res.send({message: "Class created!"})
        
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = createClass;