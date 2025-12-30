import { gql } from "graphql-tag";


export const typeDefs = gql`
  type User { id: ID! name: String email: String role: String city: String }
  type Product { id: ID! name: String price: Float image: String }
  type Order { id: ID! total: Float status: String }

  type Query {
    products(city: String): [Product]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, city: String): String
    login(email: String!, password: String!): String
    createOrder(paymentMethod: String!): Order
  }
`;