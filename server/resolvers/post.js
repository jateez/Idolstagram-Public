const { GraphQLError } = require("graphql")

const resolvers = {
  Query: {
    posts: async (_, args, contextValue) => {

    }
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
    }
  }
}

module.exports = resolvers