const db = require('../../db.js');
const bcrypt = require('bcrypt');

let mentorRegister = async (req, res) => {
    try {
        const {email, name, password, shortRegion, phonenumber} = req.body;

        // EMAIL CHECKER
        const [similar] = await db.execute('SELECT * FROM mentor WHERE email = ?', [email]);
        if(similar.length > 0){
            res.json({message: "Email has been used!"});
        };

        // ID HANDLER
        const [idQuery] = await db.execute('SELECT id FROM mentor WHERE shortRegion = ? ORDER BY id DESC LIMIT 1', [shortRegion]);
        var id = 1;
        if(idQuery.length > 0){
            const getIdNumber = idQuery[0].id.split("-")[1];
            id = parseInt(getIdNumber, 10);
            id++;
        }

        // PASSWORD HASH
        const hashedPassword = await bcrypt.hash(password, 10);

        const role = 'M';
        const newId = role + shortRegion + '-' + id.toString().padStart(4, '0');
        await db.execute('INSERT INTO mentor (id, name, email, password, shortRegion, phonenumber) VALUES (?,?,?,?,?,?)',
        [newId, name, email, hashedPassword, shortRegion, phonenumber]);

        res.json({message: "Mentor Account has been created! Wait for verification by Admin."});

    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

module.exports = mentorRegister;