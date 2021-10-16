const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Encrypt data (Password) */
module.exports.hashedPassword = async (password) =>
  await bcrypt.hash(password, await bcrypt.genSalt());

module.exports.createToken = async (value, time) => {
  const token = await jwt.sign(value, process.env.JWT_SECRET, {
    expiresIn: time,
    issuer: 'HackerBay',
  });
  return token;
};
