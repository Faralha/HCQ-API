const db = require('../../db');
const getNameFromEmail = require('../../function/getNameFromEmail')
const getEmail = require('../../function/getEmail');

const createClass = async (req, res) => {
    try {
        const {subClass} = req.body;
        
        const [semesterRaw] = await db.execute('SELECT semester FROM semester ORDER BY semester DESC LIMIT 1');
        const semester = semesterRaw[0].semester;
        const token = req.cookies['api-auth'];
        const email = getEmail(token);

        console.log(semester);

        // Fetch Mentor Id
        const [id_mentor_raw] = await db.execute('SELECT id FROM mentor WHERE email = ?',
        [email]);
        const id_mentor = id_mentor_raw[0].id;

        // TAHSIN-0001 (PK example)
        const [similarClass] = await db.execute('SELECT id FROM class WHERE jenis = ?',
        [subClass]);

        var classIndex;
        if(similarClass.length <= 0){
            classIndex = 1;
        } else {
            const classIndexRaw = similarClass[0].id.split('_')[1];
            classIndex = parseInt(classIndexRaw, 10) + 1;
        }
        const id = subClass.toUpperCase() + '_' + classIndex.toString().padStart(4, '0');

        // INSERTION
        await db.execute('INSERT INTO class (id, mentor, semester, jenis) values (?, ?, ?, ?)',
        [id, id_mentor, semester, subClass]);

        res.send({message: `Class ${id} created!`});
        
    } catch (error) {
        res.status(500);
    }
}

module.exports = createClass;