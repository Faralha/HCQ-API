const db = require('../../db');

const verifyMentor = async (req, res) => {
    try {
        const {email} = req.body
        const [similar] = await db.execute('SELECT isVerified FROM mentor WHERE email = ?', [email]);

        if(similar[0].isVerified === 1){
            return res.send({alert : "Mentor already verified."});
        };

        await db.execute('UPDATE mentor SET isVerified = 1 WHERE email = ?', [email]);
        res.send({message: "Successfully verified mentor!"})
    } catch (error) {
        res.status(500);
    }
}

module.exports = verifyMentor