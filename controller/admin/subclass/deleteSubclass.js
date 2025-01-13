const db = require('../../../db');

const deleteSubClass = async (req, res) => {
  try {
    const {jenis} = req.body;
    console.log(jenis);
    await db.execute('DELETE FROM jenis WHERE jenis = ?', [jenis]);
    res.send({
      status: 'success',
      message: `Successfully deleted ${jenis}!`,
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

module.exports = deleteSubClass;
