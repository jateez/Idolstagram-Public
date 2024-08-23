if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { getDB, connect } = require("./config/connection");

const userTypeDefs = require("./schema/user.js");
const postTypeDefs = require("./schema/post.js");
const followTypeDefs = require("./schema/follow.js");
const userResolvers = require("./resolvers/user")
const postResolvers = require("./resolvers/post")
const followResolvers = require("./resolvers/follow");
const authentication = require("./middlewares/authentication.js");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true
})


connect()
  .then(() => getDB())
  .then((instanceDb) => startStandaloneServer(server, {
    listen: {
      port: process.env.PORT || 4000
    },
    context: ({ req, res }) => {
      return {
        instanceDb,
        authentication: async () => await authentication(req)
      }
    }
  }))
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);

  })
  .catch((err) => {
    console.log(`${err} <-- Error`)
  })