import { gql, useQuery } from "@apollo/client"

export const REGISTER = gql`
  mutation Register($newUser: NewUser) {
  register(newUser: $newUser) {
    _id
    name
    username
    email
  }
}
`

export const LOGIN = gql`
  mutation Login($loggedUser: LoggedUser) {
  login(loggedUser: $loggedUser)
}
`

export const GET_POSTS = gql`
query Query {
  posts {
    _id
    content
    tags
    imgUrl
    authorId
    authorName
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`
export const SEARCH_USER = gql`
query SearchUsers($query: SearchUser) {
  searchUsers(query: $query) {
    _id
    name
    username
    email
  }
}
`
export const ADD_POST = gql`
mutation Mutation($newPost: NewPost) {
  addPost(newPost: $newPost) {
    _id
    authorId
    authorName
    comments {
      content
      username
      createdAt
      updatedAt
    }
    content
    createdAt
    imgUrl
    likes {
      createdAt
      updatedAt
      username
    }
    tags
    updatedAt
  }
}
`
export const GET_POST_BY_ID = gql`
query Query($getPostId: ID) {
  getPost(id: $getPostId) {
    _id
    content
    tags
    imgUrl
    authorId
    authorName
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}`

export const ADD_COMMENT = gql`
mutation Mutation($newComment: NewComment) {
  addComment(newComment: $newComment) {
    content
    username
    createdAt
    updatedAt
  }
}
`
export const GET_USER_BY_ID = gql`
query Query($getUserByIdId: ID!) {
  getUserById(id: $getUserByIdId) {
    _id
    name
    username
    email
    followers {
      _id
      name
      username
      email
      followingId
      followerId
      createdAt
      updatedAt
    }
    followings {
      _id
      name
      username
      email
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
}
`
export const ADD_FOLLOW_USER = gql`
mutation AddFollow($newFollow: NewFollow) {
  addFollow(newFollow: $newFollow) {
    _id
    followingId
    followerId
    createdAt
    updatedAt
  }
}
`
export const ADD_LIKE_TO_POST = gql`
mutation Mutation($newLike: NewLike) {
  addLike(newLike: $newLike) {
    username
    createdAt
    updatedAt
  }
}
`