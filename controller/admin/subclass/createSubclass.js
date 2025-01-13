const db = require('../../../db');

const createSubClass = async (req, res) => {
  try {
    const { jenis, keterangan } = req.body;
    const email = req.session.user.email;
    const [similar] = await db.execute(
      'SELECT jenis FROM JENIS where jenis = ?',
      [jenis],
    );
    if (similar.length > 0) {
      return res.send({
        message: `Subclass / Jenis for ${jenis} already exists! Try different name?`,
      });
    }

    await db.execute(
      'INSERT INTO jenis (jenis, keterangan, created_by) VALUES (?,?,?)',
      [jenis, keterangan || '', email],
    );

    res.send({
      status: 'success',
      message: `subClass / Jenis Kelas ${jenis} has been created!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = createSubClass;
