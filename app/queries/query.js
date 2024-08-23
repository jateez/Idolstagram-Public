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