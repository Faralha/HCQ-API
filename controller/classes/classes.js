const db = require('../../db');

const classes = async (req, res) => {
    try {
        const [kelas] = await db.execute('SELECT * FROM class')
        res.json({class : kelas});
    } catch (error) {
        res.status(500);
    }
}

module.exports = classes;