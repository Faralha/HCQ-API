const db = require('../../../db');

const createClass = async (req, res) => {
  try {
    const { jenis, id_mentor } = req.body;

    const [semesterRaw] = await db.execute(
      'SELECT semester FROM semester ORDER BY semester DESC LIMIT 1',
    );
    const semester = semesterRaw[0].semester;

    // TAHSIN-0001 (PK example)
    const [similarClass] = await db.execute(
      'SELECT id FROM class WHERE jenis = ?',
      [jenis],
    );

    var classIndex;
    if (similarClass.length <= 0) {
      classIndex = 1;
    } else {
      const classIndexRaw = similarClass[0].id.split('_')[1];
      classIndex = parseInt(classIndexRaw, 10) + 1;
    }
    const id =
      jenis.toUpperCase() + '_' + classIndex.toString().padStart(4, '0');

    // INSERTION
    await db.execute(
      'INSERT INTO class (id, mentor, semester, jenis) values (?, ?, ?, ?)',
      [id, id_mentor, semester, jenis],
    );

    res.json({
      status: 'success',
      message: `Class ${id} created!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = createClass;
