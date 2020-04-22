require('dotenv').config();

module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        NOW_URL: process.env.NOW_URL,
    },
};
