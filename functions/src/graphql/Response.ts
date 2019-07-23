import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type PostVideoResponse {
    message: String!
    success: Boolean!
}
`