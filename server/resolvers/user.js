const { GraphQLError } = require("graphql")
const emailValidator = require("../helpers/emailValidator")
const { hashPassword, verifyPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { ObjectId } = require("mongodb")
const resolvers = {
  Query: {
    users: async (_, args, contextValue) => {
    },
    searchUsers: async (_, args, contextValue) => {
      const { instanceDb, authentication } = contextValue
      const { query } = args
      await authentication()
      let results = []

      if (query.name) {
        let temp = await instanceDb.collection('users').aggregate(
          [
            { $match: { name: { $regex: new RegExp(query.name, "i") } } },
            { $project: { password: 0 } }
          ],
          { maxTimeMS: 60000, allowDiskUse: true }
        ).toArray()
        results = temp
      }
      if (query.username) {
        let temp = await instanceDb.collection('users').aggregate(
          [
            { $match: { username: { $regex: new RegExp(query.username, "i") } } },
            { $project: { password: 0 } }
          ],
          { maxTimeMS: 60000, allowDiskUse: true }
        ).toArray()
        results = temp
      }
      return results
    },
    getUserById: async (_, args, contextValue) => {
      const { authentication, instanceDb } = contextValue;
      const { id } = args;
      await authentication()

      const foundUser = await instanceDb.collection("users").findOne({ _id: new ObjectId(id) })
      if (!foundUser) {
        throw new Error("User not found")
      }
      const result = await instanceDb.collection("users").aggregate(
        [
          {
            $match: {
              _id: new ObjectId(id)
            }
          },
          {
            $lookup: {
              from: 'follows',
              localField: '_id',
              foreignField: 'followingId',
              as: 'followers',
              pipeline: [
                {
                  $lookup: {
                    from: "users",
                    localField: "followerId",
                    foreignField: "_id",
                    as: "data",
                  },
                },
                {
                  $unwind: {
                    path: "$data"
                  }
                },
                {
                  $addFields: {
                    name: "$data.name",
                    username: "$data.username",
                    email: "$data.email",
                  }
                },
                {
                  $unset: "data"
                }
              ]
            }
          },
          {
            $lookup: {
              from: 'follows',
              localField: '_id',
              foreignField: 'followerId',
              as: 'followings',
              pipeline: [
                {
                  $lookup: {
                    from: "users",
                    localField: "followingId",
                    foreignField: "_id",
                    as: "data",
                  },
                },
                {
                  $unwind: {
                    path: "$data"
                  }
                },
                {
                  $addFields: {
                    name: "$data.name",
                    username: "$data.username",
                    email: "$data.email",
                  }
                },
                {
                  $unset: "data"
                }
              ]
            }
          },
          {
            $unset: ["password"]
          }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
      ).toArray();

      return result[0]
    }
  },
  Mutation: {
    register: async (_, args, contextValue) => {
      const { newUser } = args
      const { instanceDb } = contextValue

      if (!emailValidator(newUser.email)) {
        throw Error("Invalid Email format");
      }

      const foundRegisteredEmail = await instanceDb.collection("users").findOne({
        email: newUser.email
      })

      if (foundRegisteredEmail) {
        throw Error("Email already used");
      }
      const foundRegisteredUsername = await instanceDb.collection("users").findOne({
        username: newUser.username
      })
      if (foundRegisteredUsername) {
        throw Error("Username already used");
      }
      if (newUser.password.length < 5) {
        throw Error("Password is too weak. Minimum password length is 5");
      }

      newUser.password = hashPassword(newUser.password)

      await instanceDb.collection("users").insertOne(newUser);

      return newUser
    },
    login: async (_, args, contextValue) => {
      const { loggedUser } = args;
      const { instanceDb } = contextValue;

      const foundUser = await instanceDb.collection("users").findOne({ email: loggedUser.email })

      if (!foundUser) {
        throw Error("Invalid Email or Password");
      }

      if (!verifyPassword(loggedUser.password, foundUser.password)) {
        throw Error("Invalid Email or Password");
      }
      let access_token = signToken({ id: foundUser._id })
      return access_token
    },

  }
}

module.exports = resolvers