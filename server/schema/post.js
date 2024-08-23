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
  authorName: String!
  comments: [Comment]
  likes: [Like]
  createdAt: String
  updatedAt: String
}


type Query {
  posts: [Post]
  getPost(id: ID): Post
}

input NewPost {
  content: String!
  tags: [String]
  imgUrl: String
  comments: [NewComment]
  likes: [NewLike]
  createdAt: String
  updatedAt: String
}

input NewComment {
  content: String!
  postId: String!
}

input NewLike {
  postId: String!
}

type Mutation {
  addPost(newPost: NewPost): Post
  addComment(newComment: NewComment): Comment
  addLike(newLike: NewLike): Like
}

`
module.exports = typeDefs