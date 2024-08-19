const { GraphQLError } = require("graphql")

const resolvers = {
  Query: {
    follows: async (_, args, contextValue) => {

    }
  },
  Mutation: {
    addFollow: async (_, args, contextValue) => {
    }
  }
}

module.exports = resolvers