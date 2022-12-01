const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();
const messages = [];

module.exports = {
    Query: {
        getMessages: () => messages
    },
    Mutation:{
        createMessage: (parent, {inputMessage}) => {
            const newMessage = {id: messages.length, ...inputMessage}
            messages.push(newMessage)

            pubsub.publish("CREATE_MESSAGE", {
                messageCreator: newMessage
            })

            return newMessage
        }
    },
    Subscription: {
        messageCreator: {
            subscribe: () => pubsub.asyncIterator("CREATE_MESSAGE")
        }
    }
}