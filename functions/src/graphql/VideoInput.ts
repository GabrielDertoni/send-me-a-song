import { gql } from 'apollo-server-express';

export const typeDefs = gql`
input ThumbnailInput {
    url: String!
    width: Int!
    height: Int!
}
input ThumbnailsInput {
    default: ThumbnailInput!
    medium: ThumbnailInput!
    high: ThumbnailInput!
}
input VideoInput {
    id: ID!
    link: String!
    title: String!
    thumbnails: ThumbnailsInput!
}
`