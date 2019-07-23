import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query {
    videos: [Video!]!
    getYouTubeSearchResults(search: String!, maxResults: Int = 5): YTAPI_SearchResults
    queryYouTube(
        part: String!,
        channelId: ID,
        channelType: YTAPI_ChannelType,
        eventType: YTAPI_EventType,
        location: YTAPI_Location,
        maxResults: Int,
        order: YTAPI_Order,
        pageToken: String,
        publishedAfter: String,
        publishedBefore: String,
        q: String,
        regionCode: String,
        relevanceLanguage: String,
        safeSearch: YTAPI_SafeSearch,
        topicId: ID,
        type: YTAPI_Type,
        videoCaption: YTAPI_VideoCaption,
        videoCategoryId: ID,
        videoDefinition: YTAPI_VideoDefinition,
        videoDimension: YTAPI_VideoDimension,
        videoDuration: YTAPI_VideoDuration,
        videoEmbeddable: YTAPI_VideoEmbeddable,
        videoLicense: YTAPI_VideoLicense,
        videoSyndicated: YTAPI_VideoSyndicated,
        videoType: YTAPI_VideoType
        ): YTAPI_Response!
}
`