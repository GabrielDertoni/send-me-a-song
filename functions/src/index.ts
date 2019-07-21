import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { google } from 'googleapis';

const cors = require('cors')({
    origin: true
})
const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

/**
 * A function that returns a object following the model if and only if the object parameter has all of the necessary
 * attributes, else it returns null.
 * @param object The object that needs to be checked whether or not has some attributes.
 * @param model The model that the object should follow (acts as an interface). Should be an object with key type pairs (String, Number, etc).
 */
function matchInterface(object: any, model: any): any {
    const result: any = {};
    for (const key in model) {
        // Check if object is not undefined.
        if (object[key] !== undefined) {
            // If model[key] is an object, call the function recursivelly. If not, check if type is correct and write the values on the result.
            if (typeof model[key] === "object") {
                const subobj = matchInterface(object[key], model[key]);
                if (subobj) result[key] = subobj;
                else return null;
            } else {
                // Check if object[key] is of the required type.
                if (typeof object[key] === model[key].name.toLowerCase() || object[key] instanceof model[key]) {
                    result[key] = object[key];
                } else {
                    console.error(`object["${key}"] (${typeof object[key]}) does not have type "${model[key].name}"`);
                    return null;
                }
            }
        } else {
            console.error(`object["${key}"] is not defined.`);
            return null;
        }
    }
    return result;
}

// interface Thumbnail {
//     url: String,
//     width: Number,
//     height: Number
// }

interface Video {
    id?: String,
    title?: String,
    description?: String,
    thumbnails?: any
}

interface GetYouTubeSearchResultsResponse {
    config?: {
        url?: String,
        search: any,
        maxResults: any
    },
    videos: Array<Video>,
    error: String
}

export const getYouTubeSearchResults = functions.https.onRequest((request, response) => {
    // Only allow GET requests
    if (request.method !== 'GET') {
        return response.status(500).json({
            error: "Only GET requests are allowed."
        });
    }
    // Enable cross-origin response
    return cors(request, response, () => {
        // Get the search term to send to the youtube search api
        const search = matchInterface(request.query, { search: String }).search;
        if (!search) {
            response.status(500).json({
                error: "No search term found."
            });
            return;
        }
        // Get the maxResults. Can be undefined.
        const maxResults: number | undefined = request.query.maxResults ? request.query.maxResults : request.body.maxResults;
        // Gets the database from firebase realtime database and reads the value on the property
        // youtube inside the object API_KEYS.
        admin.database().ref("API_KEYS/youtube").once("value")
        .then(snap => {
            // Gets the api_key
            const api_key = snap.val();
            // Uses the youtube search api to get all search results with the q term
            google.youtube('v3').search.list({
                key: api_key,
                part: "snippet",
                q: search,
                maxResults: maxResults ? maxResults : 5
            })
            .then(youtube_res => {
                // response.json(r);
                const config = {
                    url: youtube_res.config.url,
                    search: youtube_res.config.params.q,
                    maxResults: youtube_res.config.params.maxResults
                };
                const data = youtube_res.data;
                if (data.items) {
                    const videos: Array<Video> = [];
                    for (const item of data.items) {
                        if (item.snippet && item.id) {
                            videos.push({
                                id: item.id.videoId,
                                title: item.snippet.title,
                                description: item.snippet.description,
                                thumbnails: item.snippet.thumbnails
                            });
                        } else {
                            // tslint:disable-next-line: no-shadowed-variable
                            const message: GetYouTubeSearchResultsResponse = {
                                config: config,
                                videos: [],
                                error: "Item snipet or id not defined in youtube API response."
                            }
                            response.json(message);
                        }
                    }
                    const message: GetYouTubeSearchResultsResponse = {
                        config: config,
                        videos: videos,
                        error: ""
                    }
                    response.json(message);
                } else {
                    console.log("items, in youtube API response was undefined.");
                    const message: GetYouTubeSearchResultsResponse = {
                        config: config,
                        videos: [],
                        error: "items, in youtube API response was undefined."
                    }
                    response.json(message);
                }
            })
            .catch(err => {
                // Catches any errors that ocurred in the youtube api response.
                console.log(err);
                const message: GetYouTubeSearchResultsResponse = {
                    config: undefined,
                    videos: [],
                    error: "An internal error has occurred..."
                }
                response.status(500).send(message);
            });
        })
        .catch(err => {
            // Catches any errors that ocurred in the database accessing.
            console.log(err);
            const message: GetYouTubeSearchResultsResponse = {
                config: undefined,
                videos: [],
                error: "An internal error has occurred..."
            }
            response.status(500).send(message);
        });
    });
});

/**
 * Interface for all responses in the postVideo function.
 */
interface PostVideoResponse {
    message: String,
    success: Boolean
}

export const postVideo = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        const message: PostVideoResponse = {
            message: "Error: Only POST requests allowed",
            success: false
        };
        return response.status(500).json(message);
    }
    return cors(request, response, () => {
        // Checks if video has all of the required attributes.
        const video = matchInterface(JSON.parse(request.body), {
            link: String,
            title: String,
            id: String,
            thumbnails: {
                default: {
                    url: String,
                    width: Number,
                    height: Number
                },
                medium: {
                    url: String,
                    width: Number,
                    height: Number
                },
                high: {
                    url: String,
                    width: Number,
                    height: Number
                }
            }
        });
        if (!video) {
            console.error("Error: request.body does not contain the specified attributes");
            const message: PostVideoResponse = {
                message: "An error has occured",
                success: false
            };
            response.status(500).json(message);
            return;
        }
        // Check if video already exists in database.
        const ref = admin.database().ref("songs");
        ref.once("value")
        .then(snapshot => {
            const videos = snapshot.val();
            for (const id in videos) {
                if (videos[id].id === video.id) {
                    const message: PostVideoResponse = {
                        message: "Data already exists in database.",
                        success: false
                    };
                    response.json(message);
                    return;
                }
            }
        })
        .then(() => {
            ref.push(video)
            .then(() => {
                const message: PostVideoResponse = {
                    message: "Success",
                    success: true
                };
                response.json(message);
            })
            .catch(err => {
                console.error(err);
                const message: PostVideoResponse = {
                    message: "An error has occured",
                    success: false
                };
                response.json(message);
            });
        })
        .catch(error => {
            console.log(error);
            const message: PostVideoResponse = {
                message: "An error has occured",
                success: false
            };
            response.status(500).json(message);
        });
    });
});