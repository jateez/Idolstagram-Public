const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_JWT || "SECRET";

const signToken = (token) => {
  return jwt.sign(token, SECRET)
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET)
}

module.exports = { signToken, verifyToken }