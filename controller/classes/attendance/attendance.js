const db = require('../../../db');

const attendance = async (req, res) => {
    try {
        const {classes} = req.body;
        const [results] = await db.execute('SELECT * FROM attendance a LEFT JOIN class c ON a.id_class = c.id WHERE c.id = ?',
        [classes || null]);

        res.json({
            attendance : results
        })
    } catch (error) {
        res.status(500);
    }
}

module.exports = attendance;