import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    """
    The channelType parameter lets you restrict a search
    to a particular type of channel.
    """
    enum YTAPI_ChannelType {
        """
        Return all channels.
        """
        ANY
        """
        Only retrieve shows.
        """
        SHOW
    }

    """
    The eventType parameter restricts a search to broadcast events.
    If you specify a value for this parameter, you must also set the
    type parameter's value to video.
    """
    enum YTAPI_EventType {
        """
        Only include completed broadcasts.
        """
        COMPLETED
        """
        Only include active broadcasts.
        """
        LIVE
        """
        Only include upcoming broadcasts.
        """
        UPCOMING
    }
    """
    The location parameter, in conjunction with the locationRadius
    parameter, defines a circular geographic area and also restricts
    a search to videos that specify, in their metadata, a geographic
    location that falls within that area. The parameter value is a string
    that specifies latitude/longitude coordinates e.g. (37.42307,-122.08427).
    """
    input YTAPI_Location {
        """
        The latitude of the location that identifies the point at the center
        of the area.
        """
        latitude: Float
        """
        "The longitude of the location that identifies the point at the
        center of the area.
        """
        longitude: Float
        """
        The locationRadius parameter specifies the maximum distance that the
        location associated with a video can be from that point for the video
        to still be included in the search results.
        """
        locationRadius: Float
    }
    """
    The order parameter specifies the method that will be used to order
    resources in the API response. The default value is relevance.
    """
    enum YTAPI_Order {
        """
        Resources are sorted in reverse chronological order based on the date
        they were created.
        """
        DATE
        """
        Resources are sorted from highest to lowest rating.
        """
        RATING
        """
        Resources are sorted based on their relevance to the search query.
        This is the default value for this parameter.
        """
        RELEVANCE
        """
        Resources are sorted alphabetically by title.
        """
        TITLE
        """
        Channels are sorted in descending order of their number of uploaded videos.
        """
        VIDEO_COUNT
        """
        Resources are sorted from highest to lowest number of views.
        For live broadcasts, videos are sorted by number of concurrent
        viewers while the broadcasts are ongoing.
        """
        VIEW_COUNT
    }
    """
    The safeSearch parameter indicates whether the search results should
    include restricted content as well as standard content.
    """
    enum YTAPI_SafeSearch {
        """
        YouTube will filter some content from search results and,
        at the least, will filter content that is restricted in your
        locale. Based on their content, search results could be removed
        from search results or demoted in search results. This is the
        default parameter value.
        """
        MODERATE
        """
        YouTube will not filter the search result set.
        """
        NONE
        """
        YouTube will try to exclude all restricted content from the search
        result set. Based on their content, search results could be removed
        from search results or demoted in search results.
        """
        STRICT
    }
    """
    The type parameter restricts a search query to only retrieve a particular
    type of resource. The value is a comma-separated list of resource types.
    The default value is video,channel,playlist.
    """
    enum YTAPI_Type {
        CHANNEL
        PLAYLIST
        VIDEO
    }
    """
    The videoCaption parameter indicates whether the API should filter video
    search results based on whether they have captions. If you specify a value
    for this parameter, you must also set the type parameter's value to video.
    """
    enum YTAPI_VideoCaption {
        """
        Do not filter results based on caption availability.
        """
        ANY
        """
        Only include videos that have captions.
        """
        CLOSE_CAPTION
        """
        Only include videos that do not have captions.
        """
        NONE
    }
    """
    The videoDefinition parameter lets you restrict a search to only include
    either high definition (HD) or standard definition (SD) videos. HD videos
    are available for playback in at least 720p, though higher resolutions,
    like 1080p, might also be available. If you specify a value for this
    parameter, you must also set the type parameter's value to video.
    """
    enum YTAPI_VideoDefinition {
        """
        Return all videos, regardless of their resolution.
        """
        ANY
        """
        Only retrieve HD videos.
        """
        HIGH
        """
        Only retrieve videos in standard definition.
        """
        STANDARD
    }
    """
    The videoDimension parameter lets you restrict a search to only
    retrieve 2D or 3D videos. If you specify a value for this parameter,
    you must also set the type parameter's value to video.
    """
    enum YTAPI_VideoDimension {
        """
        Include both 3D and non-3D videos in returned results.
        This is the default value.
        """
        ANY
        """
        Restrict search results to exclude 3D videos.
        """
        TWO_D
        """
        Restrict search results to only include 3D videos.
        """
        THREE_D
    }
    """
    The videoDuration parameter filters video search results based on their
    duration. If you specify a value for this parameter, you must also set
    the type parameter's value to video.
    """
    enum YTAPI_VideoDuration {
        """
        Do not filter video search results based on their duration.
        This is the default value.
        """
        ANY
        """
        Only include videos longer than 20 minutes.
        """
        LONG
        """
        Only include videos that are between four and 20 minutes long (inclusive).
        """
        MEDIUM
        """
        Only include videos that are less than four minutes long.
        """
        SHORT
    }
    """
    The videoEmbeddable parameter lets you to restrict a search to only
    videos that can be embedded into a webpage. If you specify a value
    for this parameter, you must also set the type parameter's value to video.
    """
    enum YTAPI_VideoEmbeddable {
        """
        Return all videos, embeddable or not.
        """
        ANY
        """
        Only retrieve embeddable videos.
        """
        TRUE
    }
    enum YTAPI_VideoLicense {
        """
        Return all videos, regardless of which license they have,
        that match the query parameters.
        """
        ANY
        """
        Only return videos that have a Creative Commons license.
        Users can reuse videos with this license in other videos that
        they create.
        """
        CREATIVE_COMMON
        """
        Only return videos that have the standard YouTube license.
        """
        YOUTUBE
    }
    """
    The videoSyndicated parameter lets you to restrict a search to only
    videos that can be played outside youtube.com. If you specify a value
    for this parameter, you must also set the type parameter's value to video.
    """
    enum YTAPI_VideoSyndicated {
        """
        Return all videos, syndicated or not.
        """
        ANY
        """
        Only retrieve syndicated videos.
        """
        TRUE
    }
    """
    The videoType parameter lets you restrict a search to a particular type
    of videos. If you specify a value for this parameter, you must also set
    the type parameter's value to video.
    """
    enum YTAPI_VideoType {
        """
        Return all videos.
        """
        ANY
        """
        Only retrieve episodes of shows.
        """
        EPISODE
        """
        Only retrieve movies.
        """
        MOVIE
    }
    type YTAPI_ResponsePageInfo {
        totalResults: Int
        resultsPerPage: Int
    }
    type YTAPI_ResponseItemId {
        kind: String
        videoId: ID
    }
    type YTAPI_ResponseItemSnippetThumbnail {
        url: String
        width: Int
        height: Int
    }
    type YTAPI_ResponseItemSnippetThumbnails {
        default: YTAPI_ResponseItemSnippetThumbnail
        medium: YTAPI_ResponseItemSnippetThumbnail
        high: YTAPI_ResponseItemSnippetThumbnail
    }
    type YTAPI_ResponseItemSnippet {
        publishedAt: String
        channelId: ID
        title: String
        description: String
        thumbnails: YTAPI_ResponseItemSnippetThumbnails
        channelTitle: String
        liveBroadcastContent: String
    }
    type YTAPI_ResponseItem {
        kind: String
        etag: ID
        id: YTAPI_ResponseItemId
        snippet: YTAPI_ResponseItemSnippet
    }
    type YTAPI_Response {
        kind: String
        etag: ID
        nextPageToken: String
        prevPageToken: String
        regionCode: String
        pageInfo: YTAPI_ResponsePageInfo
        items: [YTAPI_ResponseItem]
    }
    type YTAPI_SearchResultsError {
        message: String
    }
    type YTAPI_SearchResults {
        videos: [Video!]
        error: YTAPI_SearchResultsError
    }
`;