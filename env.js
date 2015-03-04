"use strict";

module.exports = {
    MONGODB: process.env.MONGOLAB_URI || process.env.MONGODB || "",
    USERNAME: process.env.USERNAME || "",
    PASSWORD: process.env.PASSWORD || "",
    SECRET_KEY: process.env.SECRET_KEY || ""
};
