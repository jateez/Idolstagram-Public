const { ObjectId } = require("mongodb")
const { getDB } = require("../config/connection")
const { verifyToken } = require("../helpers/jwt")
const authentication = async (req) => {
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

  const instanceDb = await getDB()
  const foundUser = await instanceDb.collection("users").findOne({ _id: new ObjectId(verifiedToken.id) })

  if (!foundUser) {
    throw new Error("Unauthenticated")
  }
  return verifiedToken.id
}
module.exports = authentication