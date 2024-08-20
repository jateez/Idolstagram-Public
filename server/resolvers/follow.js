const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");

const resolvers = {
  Query: {
  },
  Mutation: {
    addFollow: async (_, args, contextValue) => {
      const { authentication, instanceDb } = contextValue;
      const userId = await authentication()
      const { newFollow } = args

      const followedUser = await instanceDb.collection("users").findOne({ _id: new ObjectId(newFollow.followingId) })
      if (!followedUser) {
        throw new Error("Followed Account does not exists")
      }
      const followerUser = await instanceDb.collection("users").findOne({ _id: new ObjectId(userId) })
      if (!followerUser) {
        throw new Error("Follower Account does not exists")
      }
      if (newFollow.followingId === userId) {
        throw new Error("Cannot follow your own account")
      }
      const foundFollowing = await instanceDb.collection("follows").findOne(
        { followingId: new ObjectId(newFollow.followingId), followerId: new ObjectId(userId) }
      )

      if (foundFollowing) {
        throw new Error("Already Followed")
      }

      newFollow.createdAt = new Date()
      newFollow.updatedAt = new Date()
      newFollow.followerId = new ObjectId(userId)
      newFollow.followingId = new ObjectId(newFollow.followingId)
      await instanceDb.collection("follows").insertOne(newFollow)
      return newFollow
    }
  }
}

module.exports = resolvers