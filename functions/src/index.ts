import * as functions from 'firebase-functions';
import { ApolloServer } from 'apollo-server-express';

const express = require("express");
const { resolvers } = require('./graphql-schema.js');

const videoTypeDefs = require('./graphql/Video.js').typeDefs;
const videoInputTypeDefs = require('./graphql/VideoInput.js').typeDefs;
const ResponseTypeDefs = require('./graphql/Response.js').typeDefs;
const QueryTypeDefs = require('./graphql/Query.js').typeDefs;
const MutationsTypeDefs = require('./graphql/Mutation.js').typeDefs;
const YouTubeAPITypeDefs = require('./graphql/YouTubeAPI.js').typeDefs;

// Querying the databse with graphQL.
const app = express();
const server = new ApolloServer({
    typeDefs: [
        videoTypeDefs,
        videoInputTypeDefs,
        ResponseTypeDefs,
        QueryTypeDefs,
        MutationsTypeDefs,
        YouTubeAPITypeDefs
    ],
    resolvers
});
server.applyMiddleware({
    app,
    path: "/",
    cors: true
});

export const graphql = functions.https.onRequest(app);