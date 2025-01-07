const db = require('../../db');

const deleteSubClass = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await db.execute('DELETE FROM jenis WHERE jenis = ?', [id]);
    res.send({
      status: 'success',
      message: `Successfully deleted ${id}!`,
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

module.exports = deleteSubClass;
