const typeDefs = `#graphql

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type Query {
    Follow: Follow
    followers(id: ID): [Follow] 
    followings(id: ID): [Follow] 
  }

  input NewFollow {
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    addFollow(newFollow: NewFollow): Follow
  }


`

module.exports = typeDefs