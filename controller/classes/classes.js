const db = require('../../db');

const classes = async (req, res) => {
    try {
        const [kelas] = await db.execute('SELECT * FROM class')
        res.send(kelas);
        console.log('kelas');
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = classes;