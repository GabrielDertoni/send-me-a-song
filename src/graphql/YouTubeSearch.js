import gql from "graphql-tag";

export const GetYouTubeSearchResults = gql`
  query GetYouTubeSearchResults($search: String!, $maxResults: Int = 5) {
    result: getYouTubeSearchResults(search: $search, maxResults: $maxResults) {
      videos {
        id
        title
        description
        thumbnails {
          default {
            url
            width
            height
          }
          medium {
            url
            width
            height
          }
          high {
            url
            width
            height
          }
        }
      }
    }
  }
`;
