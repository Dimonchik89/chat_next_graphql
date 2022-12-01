import { gql } from '@apollo/client';


export const GET_MESSAGES_SERVER = `query ExampleQuery {
  getMessages {
    id
    user
    body
  }
}`

export const GET_MESSAGE = gql`
  query ExampleQuery {
    getMessages {
      id
      user
      body
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation Mutation($inputMessage: InputMessage!) {
    createMessage(inputMessage: $inputMessage) {
      id
      user
      body
    }
  }
`

export const SUBSCRIBE_MESSAGE = gql`
  subscription Subscription {
    messageCreator {
      id
      user
      body
    }
  }
`