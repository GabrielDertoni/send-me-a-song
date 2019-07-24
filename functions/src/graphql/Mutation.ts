import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Mutation {
    postVideo(videoId: ID!, title: String!): PostVideoResponse!
}
`