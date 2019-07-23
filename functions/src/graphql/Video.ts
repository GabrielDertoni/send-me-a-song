import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Thumbnail {
    url: String!
    height: Int!
    width: Int!
}
type Thumbnails {
    default: Thumbnail!
    medium: Thumbnail!
    high: Thumbnail!
}
type Video {
    id: ID!
    link: String!
    title: String!
    thumbnails: Thumbnails
}
`