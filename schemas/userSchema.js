import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users(start: Int, limit: Int): [User]
    user(id: ID!): User
    login(username: String!, password: String!): User
  }

  extend type Mutation {
    registerUser(username: String!, password: String!, full_name: String): User
  }

  type User {
    id: ID
    username: String
    full_name: String
    token: String
  }
`;
