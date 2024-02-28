const db = require('../db');
const bcrypt = require('bcrypt');

let register = async (req, res) => {
    var { email, name, password, city, address, phonenumber } = req.body;
    
        // BCRYPT PASSWORD HASH
        const hashedPassword = await bcrypt.hash(password, 10);
    
        try {
    
            // CHECK IF EMAIL HAS BEEN USED
            const [similar] = await db.execute('SELECT email FROM student WHERE EMAIL = ?', [email]);
            if (similar.length > 0){
                return res.status(400).send({ message: 'Email sudah dipakai.' });
            }
    
            // SUFFIX NUMBER AUTO INCREMENT
            const [getId] = await db.execute('SELECT id FROM student ORDER BY id DESC LIMIT 1;');
            const getIdNumber = getId[0].id.split("-")[1];
            var lastId = parseInt(getIdNumber, 10);
    
            lastId++;
    
            // PREFIX 
            const role = 'S' // S for Student
            const city = 'JKT' // JKT for Jakarta as an example
    
            // NEW PRIMARY KEY
            let newId = role + city + '-' + lastId.toString().padStart(4, '0');
    
            await db.execute(`INSERT INTO student ( id, name, email, password, city, address, phonenumber) VALUES (?, ?, ?, ?, ?, ?, ?);`,
            [newId, name, email, hashedPassword, city || null, address || null, phonenumber]);
    
            res.status(200).json({ message: 'Akun Berhasil Dibuat!'});
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error!' });
        }
}

module.exports = register;