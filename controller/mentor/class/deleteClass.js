const db = require('../../../db');

const deleteClass = async (req, res) => {
  try {
    const {id} = req.body;

    // CHECK VALIDITY
    const [similar] = await db.execute('SELECT id FROM class where id = ?', [
      id,
    ]);
    if (similar.length === 0) {
      return res.json({
        message: `Class '${id}' does not exist!`,
      });
    }

    // DELETE
    await db.execute('DELETE FROM class WHERE id = ?', [id]);

    res.json({
      status: 'success',
      message: `Class '${id}' has been deleted!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = deleteClass;
