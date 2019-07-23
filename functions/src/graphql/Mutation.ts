import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Mutation {
    postVideo(video: VideoInput!): PostVideoResponse!
}
`