const { GraphQLError } = require("graphql")
const { ObjectId } = require("mongodb")

const resolvers = {
  Query: {
    posts: async (_, args, contextValue) => {
      const { authentication, instanceDb } = contextValue;
      await authentication()

      const result = await instanceDb.collection('posts').aggregate(
        [
          { $sort: { createdAt: -1 } },
          {
            $lookup: {
              from: 'users',
              localField: 'authorId',
              foreignField: '_id',
              as: 'author'
            }
          },
          {
            $unwind: {
              path: '$author',
              preserveNullAndEmptyArrays: true
            }
          },
          { $project: { 'author._id': 0 } }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
      ).toArray();

      return result;
    },
    post: async (_, args, contextValue) => {
      const { id } = args;
      const { authentication, instanceDb } = contextValue
      await authentication()
      const result = await instanceDb.collection("posts").findOne({})
      return result
    }
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
      const { authentication, instanceDb } = contextValue
      const { newPost } = args

      const userId = await authentication()
      newPost.createdAt = new Date()
      newPost.updatedAt = new Date()
      newPost.authorId = new ObjectId(userId)
      newPost.comments = []
      newPost.likes = []
      newPost.tags = []
      await instanceDb.collection("posts").insertOne(newPost)
      return newPost
    }
  }
}

module.exports = resolvers