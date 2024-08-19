const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  const salt = bcrypt.saltSync()
  return bcrypt.hashSync(password, salt)
}

const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { hashPassword, verifyPassword }
