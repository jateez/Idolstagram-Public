const { GraphQLError } = require("graphql")
const { ObjectId } = require("mongodb");
const redis = require("../config/redis");

const resolvers = {
  Query: {
    posts: async (_, args, contextValue) => {
      const { authentication, instanceDb } = contextValue;
      await authentication()
      const postsCache = await redis.get("posts:all");

      if (postsCache) {
        return JSON.parse(postsCache)
      }

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
          { $unwind: { path: '$author' } },
          {
            $addFields: { authorName: '$author.name' }
          },
          { $unset: 'author' }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
      ).toArray();

      await redis.set("posts:all", JSON.stringify(result))

      return result;
    },
    getPost: async (_, args, contextValue) => {
      const { id } = args;
      const { authentication, instanceDb } = contextValue
      await authentication()
      const result = await instanceDb.collection("posts").aggregate(
        [
          {
            $match: {
              _id: new ObjectId(id)
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'authorId',
              foreignField: '_id',
              as: 'author'
            }
          },
          { $unwind: { path: '$author' } },
          {
            $addFields: { authorName: '$author.name' }
          },
          { $unset: 'author' }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
      ).toArray();
      return result[0]
    }
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
      const { authentication, instanceDb } = contextValue
      const { newPost } = args

      const userId = await authentication()

      const foundUser = await instanceDb.collection("users").findOne({ _id: new ObjectId(userId) })

      newPost.authorName = foundUser.username
      newPost.createdAt = new Date()
      newPost.updatedAt = new Date()
      newPost.authorId = new ObjectId(userId)
      newPost.comments = []
      newPost.likes = []
      newPost.tags = []
      await instanceDb.collection("posts").insertOne(newPost)
      await redis.del("posts:all")
      return newPost
    },
    addComment: async (_, args, contextValue) => {
      const { authentication, instanceDb } = contextValue;
      const { newComment } = args;
      const userId = await authentication();

      const foundPost = await instanceDb.collection("posts").findOne({ _id: new ObjectId(newComment.postId) })
      if (!foundPost) {
        throw new Error("Post not found")
      }

      const foundUser = await instanceDb.collection("users").findOne({ _id: new ObjectId(userId) })
      if (!foundUser) {
        throw new Error("User not found")
      }

      newComment.createdAt = new Date()
      newComment.updatedAt = new Date()
      newComment.username = foundUser.username
      delete newComment.postId


      await instanceDb.collection("posts").updateOne({ _id: foundPost._id }, {
        $push: { comments: newComment },
      })

      await redis.del("posts:all")

      return newComment;
    },
    addLike: async (_, args, contextValue) => {
      const { authentication, instanceDb } = contextValue;
      const { newLike } = args
      const userId = await authentication();

      const foundPost = await instanceDb.collection("posts").findOne({ _id: new ObjectId(newLike.postId) })
      if (!foundPost) {
        throw new Error("Post not found")
      }
      const foundUser = await instanceDb.collection("users").findOne({ _id: new ObjectId(userId) })
      if (!foundUser) {
        throw new Error("User not found")
      }
      if (foundPost.likes.some(like => like.username === foundUser.username)) {
        throw new Error("Post already liked by user")
      }

      newLike.username = foundUser.username
      newLike.createdAt = new Date();
      newLike.updatedAt = new Date();
      delete newLike.postId;

      await redis.del("posts:all")

      await instanceDb.collection("posts").updateOne({ _id: foundPost._id },
        {
          $addToSet: { likes: newLike }
        }
      )
      return newLike;
    }
  }
}

module.exports = resolvers