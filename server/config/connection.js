const { MongoClient } = require("mongodb");
const URI = process.env.MONGO_URI;

const client = new MongoClient(URI)

const connect = async () => {
  try {
    await client.connect()
    client.db("GC01")
  } catch (error) {
    console.log(error, "<-- error occurred on database level")
  } finally {
    await client.close()
  }
}

const getDB = async () => {
  return client.db("GC01")
}

module.exports = { connect }