"use strict";

module.exports = {
    MONGODB: process.env.MONGOLAB_URI || process.env.MONGODB || "",
    USERNAME: process.env.USERNAME || "",
    PASSWORD: process.env.PASSWORD || "",
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY || "",
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET || "",
    TWITTER_TOKEN: process.env.TWITTER_TOKEN || "",
    TWITTER_TOKEN_SECRET: process.env.TWITTER_TOKEN_SECRET || "",
    WAPPUFI_USERNAME: process.env.WAPPUFI_USERNAME || "",
    WAPPUFI_PASSWORD: process.env.WAPPUFI_PASSWORD || "",
    SECRET_KEY: process.env.SECRET_KEY || ""
};
