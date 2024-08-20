const { ObjectId } = require("mongodb")
const { getDB } = require("../config/connection")
const { verifyToken } = require("../helpers/jwt")
const authentication = async (req) => {
  console.log(req)
  if (!req.headers.authorization) {
    throw new Error("Unauthenticated")
  }
  const [type, token] = req.headers.authorization.split(" ")
  if (type !== "Bearer") {
    throw new Error("Unauthenticated")
  }
  const verifiedToken = verifyToken(token)
  if (!verifiedToken.id) {
    throw new Error("Unauthenticated")
  }

  const instanceDb = getDB()

  const foundUser = instanceDb.collection.findOne({ id: ObjectId(id) })

  if (!foundUser) {
    throw new Error("Unauthenticated")
  }
  return foundUser.id
}
module.exports = authentication