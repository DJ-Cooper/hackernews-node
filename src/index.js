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
 */

/**
 * virtually all fields on the types in a GraphQL schema have
 * resolver functions.
 */

let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL',
    },
]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        // 2
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
    },
    // Link resolvers removed because server infers
    // what they look like
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
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
