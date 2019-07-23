import gql from 'graphql-tag';

export const PostVideoMutation = gql`
mutation PostVideoMutation($video: VideoInput!) {
    postVideo(video: $video) {
        message
        success
    }
}
`