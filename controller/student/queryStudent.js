const db = require('../../db');
const sanitizedBody = require('../../function/sanitizeInput');

const queryStudent = async (req, res) => {
    try {

        // SANIITZE INPUT
        const student = sanitizedBody(req.query.std);
        let sort = sanitizedBody(req.query.s);

        // SORT FALLBACK, DEFAULT TO ASCENDING
        if(!sort || sort != ('ASC' || 'DESC')){
            sort = 'ASC';
        };

        const [result] = await db.execute(`SELECT id, name FROM student ORDER BY name ${sort}`);

        res.json(
            result
        );

    } catch (error) {
        res.status(500);
    }
}

module.exports = queryStudent;