import * as admin from 'firebase-admin';
import { google } from 'googleapis';
import { find } from 'lodash';
// const { inspect } = require('util');

const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const objectToList = (obj: any) => Object.keys(obj).map(key => obj[key]);

interface Thumbnail {
    url?: String,
    height?: Number,
    width?: Number
}
interface Thumbnails {
    default?: Thumbnail,
    medium?: Thumbnail,
    high?: Thumbnail
}
interface Video {
    id?: String,
    link?: String,
    title?: String,
    thumbnails?: Thumbnails
}
interface YouTubeSearchResultResponse {
    videos?: Array<Video>,
    error?: {
        message: String,
    }
}
interface PostVideoResponse {
    message: String,
    success: Boolean
}
interface YTAPI_ResponseItem {
    kind?: String,
    etag?: String,
    id?: {
        kind?: String,
        videoId?: String
    },
    snippet?: {
        publishedAt?: String,
        channelId?: String,
        title?: String,
        description?: String,
        thumbnails?: Thumbnails,
        channelTitle?: String,
        liveBroadcastContent?: String
    }
}
interface YTAPI_ResponseError {
    domain?: String,
    reason?: String,
    message?: String,
    locationType?: String,
    location?: String
}
interface YTAPI_Error {
    errors?: Array<YTAPI_ResponseError>,
    code?: Number,
    message?: String
}
interface YTAPI_Response {
    kind?: String,
    etag?: String,
    nextPageToken?: String,
    prevPageToken?: String,
    regionCode?: String,
    pageInfo?: {
        totalResults?: Number,
        resultsPerPage?: Number
    },
    items?: Array<YTAPI_ResponseItem>,
    error?: YTAPI_Error
}

export const resolvers = {
    Query: {
        videos: (parent: any, args: any) => admin.database().ref("songs")
            .once("value")
            .then(snap => snap.val())
            .then(val => objectToList(val))
            .catch(console.log),
        queryYouTube: async function(parent: any, args: any): Promise<YTAPI_Response> {
            try {
                const API_key = (await admin.database().ref("API_KEYS/youtube").once("value")).val()
                function removeNulls(object: any): any {
                    const result: any = {};
                    for (const key in object) {
                        // If object[key] is neither undefined nor null.
                        if(object[key] !== undefined && object[key] !== null) {
                            if (typeof object[key] === "object" || object[key] instanceof Object) {
                                result[key] = removeNulls(object[key]);
                            } else {
                                result[key] = object[key];
                            }
                        }
                    }
                    return result;
                }
                // console.log(inspect(removeNulls(args)));
                const query = {
                    key: API_key,
                    ...removeNulls(args)
                }
                try {
                    const response = await google.youtube('v3').search.list(query);
                    return response.data;
                } catch (error) {
                    console.log(error);
                    return error;
                }
            } catch (error) {
                console.log(error);
                const response: YTAPI_Response = {
                    error: {
                        code: 500,
                        message: "An error has occurred when accessing the database for the API key."
                    }
                }
                return response;
            }
        },
        getYouTubeSearchResults: async function(parent: any, args: any): Promise<YouTubeSearchResultResponse> {
            try {
                const API_key = (await admin.database().ref("API_KEYS/youtube").once("value")).val()
                try {
                    const response = await google.youtube('v3').search.list({
                        key: API_key,
                        part: "snippet",
                        q: args.search,
                        maxResults: args.maxResults
                    });
                    
                    const videos = [];
                    const base_url = "https://www.youtube.com/watch?v=";
                    const items = response.data.items
                    if (items) {
                        for (const item of items) {
                            if (item.id && item.snippet) {
                                videos.push({
                                    id: item.id.videoId,
                                    link: base_url + item.id.videoId,
                                    title: item.snippet.title,
                                    thumbnails: item.snippet.thumbnails
                                });
                            }
                        }
                    }
                    const results: YouTubeSearchResultResponse = {
                        videos: videos
                    }
                    return results;
                } catch (error) {
                    console.log(error);
                    const message: YouTubeSearchResultResponse = {
                        error: {
                            message: "An error occurred while trying to access the youtube API."
                        }
                    };
                    return message;
                }
            } catch (error) {
                console.log(error);
                const message: YouTubeSearchResultResponse = {
                    error: {
                        message: "An error occurred while trying to access the database."
                    }
                };
                return message;
            }
        }
    },
    Mutation: {
        postVideo: async function(parent: any, args: any): Promise<PostVideoResponse> {
            try {
                const snap = await admin.database().ref("songs").once("value");
                const val = snap.val();
                const duplicate: Video | undefined = find(objectToList(val), { id: args.video.id });
                // If the video id already exists in the database, send an error message.
                if (duplicate) {
                    const message: PostVideoResponse = {
                        message: "Data already exists in database.",
                        success: false
                    };
                    return message;
                } else {
                    try {
                        const toValidObject = (obj: any) => JSON.parse(JSON.stringify(obj));
                        await admin.database().ref("songs").push(toValidObject(args.video));
                        const message: PostVideoResponse = {
                            message: "Success",
                            success: true
                        };
                        return message;
                    } catch (error) {
                        console.log(error);
                        const message: PostVideoResponse = {
                            message: "An error occured while writing to the database.",
                            success: false
                        };
                        return message;
                    }
                }
            }
            catch (error) {
                console.error(error);
                const message: PostVideoResponse = {
                    message: "An error occured while accessing the database.",
                    success: false
                };
                return message;
            }
        }
    }
}