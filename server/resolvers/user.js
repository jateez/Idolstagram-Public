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


      const result = await instanceDb.collection("users").aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followingId",
            as: "followers",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "followingId",
                  foreignField: "_id",
                  as: "data",
                  pipeline: [
                    { $unset: { name, email, password } }
                  ]
                }
              },
              {
                $unwind: {
                  path: "$followers"
                }
              }
            ]
          }
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followerId",
            as: "followings",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "followerId",
                  foreignField: "_id",
                  as: "data",
                  pipeline: [
                    { $unset: { name, email, password } }
                  ]
                }
              },
              {
                $unwind: {
                  path: "$following"
                }
              }
            ]
          }
        }
      ]).toArray()

      return result

      // // let result = await instanceDb.collection("users").aggregate(
      // //   [
      // //     {
      // //       $match: {
      // //         _id: new ObjectId(id)
      // //       }
      // //     },
      // //     {
      // //       $lookup: {
      // //         from: 'follows',
      // //         localField: '_id',
      // //         foreignField: 'followingId',
      // //         as: 'followers'
      // //       }
      // //     },
      // //     { $unwind: '$followers' },
      // //     {
      // //       $lookup: {
      // //         from: 'users',
      // //         localField: 'followers.followerId',
      // //         foreignField: '_id',
      // //         as: 'followersData'
      // //       }
      // //     },
      // //     { $unwind: { path: '$followersData' } },
      // //     {
      // //       $addFields: {
      // //         'followers.data': '$followersData'
      // //       }
      // //     },
      // //     {
      // //       $group: {
      // //         _id: '_id',
      // //         followers: { $push: '$followers' }
      // //       }
      // //     }
      // //   ],
      // //   { maxTimeMS: 60000, allowDiskUse: true }
      // // );

      // const followers = await instanceDb.collection("follows").aggregate([
      //   {
      //     $match: { followingId: new ObjectId(id) }
      //   },
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "followerId",
      //       foreignField: "_id",
      //       as: "data",
      //     }
      //   }
      // ]).toArray()

      // console.log(followers)

      // const following = await instanceDb.collection("follows").aggregate([
      //   {
      //     $match: { followerId: new ObjectId(id) }
      //   },
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "followingId",
      //       foreignField: "_id",
      //       as: "data"
      //     }
      //   }
      // ]).toArray()

      // foundUser.followers = followers;
      // foundUser.following = following;
      // let result = foundUser;
      // return result
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