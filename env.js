"use strict";

module.exports = {
    MONGODB: process.env.MONGOLAB_URI || process.env.MONGODB || "",
    USERNAME: process.env.USERNAME || "",
    PASSWORD: process.env.PASSWORD || "",
    WAPPUFI_USERNAME: process.env.WAPPUFI_USERNAME || "",
    WAPPUFI_PASSWORD: process.env.WAPPUFI_PASSWORD || "",
    SECRET_KEY: process.env.SECRET_KEY || ""
};
