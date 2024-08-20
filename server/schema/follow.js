const typeDefs = `#graphql

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type Query {
    follow: Follow
    followers(id: ID): [Follow] 
    followings(id: ID): [Follow] 
  }

  input NewFollow {
    followingId: ID
  }

  type Mutation {
    addFollow(newFollow: NewFollow): Follow
  }


`

module.exports = typeDefs