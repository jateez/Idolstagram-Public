const { GraphQLError } = require("graphql")

const resolvers = {
  Query: {
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
    }
  }
}

module.exports = resolvers