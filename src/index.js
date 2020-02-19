const { GraphQLServer } = require('graphql-yoga')

/**
 * Scalar types represent the "leaves" of the query
 * Int, Float, String, Boolean, ID
 *
 * typeDefs: type definitions of your schema
 * resolvers: JS object that mirrors root fields
 * context: object passed thru resolver chain, every
 *  resolver can read or write to
 *
 * When querying an object type, required to query at
 * least one of its fields
 *
 * milestone: completed "Getting Started"
 * on to "A Simple Query"
 * https://www.howtographql.com/graphql-js/2-a-simple-query/
 */

const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`

/**
 * virtually all fields on the types in a GraphQL schema have
 * resolver functions.
 */

// 1
let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
]

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links
  },
  // 3
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers
})

/**
 * Every GraphQL schema has three special root types, these
 * are called Query, Mutation, and Subscription.
 * They correspond to the 3 operation types
 * The fields on these are called root field and define
 * the available API operations
 *
 */

server.start(() => console.log(`Server is running on http://localhost:4000`))
