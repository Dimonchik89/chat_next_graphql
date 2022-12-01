// const { gql } = require("@apollo/server")

module.exports = `#graphql
    type Message {
        id: ID!
        user: String!
        body: String!
    }

    input InputMessage {
        user: String!
        body: String!
    }

    type Query {
        getMessages: [Message]
    }

    type Mutation {
        createMessage(inputMessage: InputMessage!): Message!
    }

    type Subscription {
        messageCreator: Message
    }
`