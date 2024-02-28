const db = require('../../db');

const createSemester = async (req, res) => {
    try {
        const {semester} = req.body;
        var newSemester;
        const [lastSemester] = await db.execute('SELECT semester FROM semester ORDER BY semester DESC LIMIT 1');
        if(lastSemester.length <= 0){
            newSemester = 1;
        } else {
            newSemester = lastSemester[0].semester + 1;
        }

        await db.execute('INSERT INTO semester (semester) values (?)',
        [newSemester]);

        res.json({message: `Semester '${newSemester}' has been created!`});
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = createSemester;