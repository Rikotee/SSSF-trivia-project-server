import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users(start: Int, limit: Int): [User]
    user(id: ID!): User
    login(username: String!, password: String!): User
  }

  extend type Mutation {
    registerUser(username: String!, password: String!, highscore: Int! = 0, highscoreSD: Int! = 0): User
  }

  extend type Mutation {
    modifyHighscore(id: ID!, highscore: Int!): User
  }

  extend type Mutation {
    modifyHighscoreSD(id: ID!, highscoreSD: Int!): User
  }

  type User {
    id: ID
    username: String
    highscore: Int
    highscoreSD: Int
    token: String
  }
`;
