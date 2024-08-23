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