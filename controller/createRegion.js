const db = require('../db');
const getEmail = require('../function/getEmail');



const createRegion = async (req, res) => {
    
    try {
        const {shortRegion, longRegion} = req.body;
        const token = req.cookies['api-auth'];
        const email = getEmail(token);

        const [similar] = await db.execute('SELECT id FROM region WHERE id = ?', [shortRegion]);

        if(similar.length > 0){
            res.json({alert : "A Similar Region has already been registered!"});
        }

        res.status(200).json({message: `Region ${shortRegion}, ${longRegion} Successfully Created.`})

        await db.execute('INSERT INTO region (id, region, createdBy) VALUES (?,?,?)',[shortRegion, longRegion, email]);

    } catch (error) {
        res.status(500);
    }
}

module.exports = createRegion;