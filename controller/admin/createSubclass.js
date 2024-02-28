const db = require('../../db');
const getEmail = require('../../function/getEmail');

const createSubClass = async (req, res) => {
    try {
        const {subClass, keterangan} = req.body;
        const [similar] = await db.execute('SELECT jenis FROM JENIS where jenis = ?', [subClass]);
        if(similar.length > 0){
            return res.send({message: `Subclass / Jenis for ${subClass} already exists! Try different name?`})
        };

        const token = req.cookies['api-auth'];
        const email = getEmail(token);

        await db.execute('INSERT INTO jenis (jenis, keterangan, createdBy) VALUES (?,?,?)',
        [subClass, keterangan || null, email]);
        
        res.send({message: `subClass / Jenis Kelas ${subClass} has been created!`});

    } catch (error) {
        res.status(500);
    }
}

module.exports = createSubClass