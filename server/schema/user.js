const typeDefs = `#graphql
type User {
  _id: ID
  name: String
  username: String!
  email: String!
}

type Query {
  users: [User]
  userById(id: ID!): User
  usersByName(name: String!): [User]
  usersByUsername(username: String!): [User]
}

input NewUser {
  name: String
  username: String!
  email: String!
  password: String!
}

input LoggedUser {
  email: String!
  password: String!
}

type Mutation {
  register(newUser: NewUser): User
  login(loggedUser: LoggedUser): String
}
`

module.exports = typeDefs