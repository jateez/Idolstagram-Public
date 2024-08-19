const { GraphQLError } = require("graphql")

const resolvers = {
  Query: {
    users: async (_, args, contextValue) => {

    }
  },
  Mutation: {
    addUser: async (_, args, contextValue) => {
    }
  }
}

module.exports = resolvers