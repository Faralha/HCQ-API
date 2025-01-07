const db = require('../db');

async function getNameFromEmail(email, role) {
  try {
    const [result] = await db.execute(
      `SELECT name FROM ${role} WHERE email = ?`,
      [email],
    );

    return result[0];
  } catch (error) {
    return error;
  }
}

module.exports = getNameFromEmail;
