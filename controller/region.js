const db = require('../db')

const region = async (req, res) => {
    try {
        const [result] = await db.execute('SELECT * from REGION');
        res.json(result);
    } catch (error) {
        res.status(500);
    }
}

module.exports = region