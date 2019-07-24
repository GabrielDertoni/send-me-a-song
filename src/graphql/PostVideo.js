import gql from "graphql-tag";

export const PostVideoMutation = gql`
  mutation PostVideoMutation($videoId: ID!, $title: String!) {
    postVideo(videoId: $videoId, title: $title) {
      message
      success
    }
  }
`;
