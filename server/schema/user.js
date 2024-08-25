const typeDefs = `#graphql
type User {
  _id: ID
  name: String
  username: String
  email: String
}

type UserDetails {
  _id: ID
  name: String
  username: String
  email: String
  followers: [UserFollowsDetails]
  followings: [UserFollowsDetails]
}

type UserFollowsDetails {
  _id: ID
  name: String
  username: String
  email: String
  followingId: ID
  followerId: ID
  createdAt: String
  updatedAt: String
}
type Query {
  users: [User]
  getUserById(id: ID!): UserDetails
  searchUsers(query: SearchUser): [User]
}

input SearchUser {
  name: String
  username: String
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