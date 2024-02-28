const db = require('../../db');

const deleteRegion = async (req, res) => {
    try {
        const {shortRegion, longRegion} = req.body;

        const [similar] = await db.execute('SELECT id FROM region WHERE id = ?', [shortRegion]);
        if(similar.length <= 0){
            res.json({alert : `Selected Region (${shortRegion}) couldn't be found!`});
        }

        await db.execute('DELETE FROM region WHERE id = ?', [shortRegion]);

        res.json({message: `Region ${shortRegion} ${longRegion} has been deleted.`});

    } catch (error) {
        res.status(500);
    }
}

module.exports = deleteRegion;