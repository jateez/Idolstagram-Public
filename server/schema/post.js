const typeDefs = `#graphql
type Comment {
  content: String!
  username: String!
  createdAt: String
  updatedAt: String
}

type Like {
  username: String!
  createdAt: String
  updatedAt: String
}

type Post {
  _id: ID
  content: String!
  tags: [String]
  imgUrl: String
  authorId: ID!
  comments: [Comment]
  likes: [Like]
  createdAt: String
  updatedAt: String
}


type Query {
  posts: [Post]
  post(id: ID): Post
}

input NewPost {
  content: String!
  tags: [String]
  imgUrl: String
  authorId: ID!
  comments: [newComment]
  likes: [newLike]
  createdAt: String
  updatedAt: String
}

input newComment {
  content: String!
  username: String!
  createdAt: String
  updatedAt: String
}

input newLike {
  username: String!
  createdAt: String
  updatedAt: String
}

type Mutation {
  addPost(newPost: NewPost): Post 
}

`
module.exports = typeDefs