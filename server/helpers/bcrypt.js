const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { hashPassword, verifyPassword }
