const typeDefs = `
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    image: String!
    price: Float!
    quantity: Int!
  }

  input ProductInput {
    name: String!
    description: String!
    image: String!
    price: Float!
    quantity: Int!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile

    getAllProducts: [Product]
    getProductById(productId: ID!): Product
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile(profileId: ID!): Profile
    removeSkill(profileId: ID!, skill: String!): Profile

    createProduct(input: ProductInput!): Product
    updateProduct(productId: ID!, input: ProductInput!): Product
    deleteProduct(productId: ID!): Product
  }
`;

module.exports = typeDefs;
