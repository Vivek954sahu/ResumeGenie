import dotenv from "dotenv";
import path from "path";

import logger from "logger.js";

export const loadEnv = () => {
    dotenv.config({ quiet: true });

    const reqVariables = [
        "NODE_ENV",
        "PORT",

        "MONGO_URI",

        "JWT_ACCESS_SECRET",
        "JWT_REFRESH_SECRET",
        "JWT_ACCESS_EXPIRES",
        "JWT_REFRESH_EXPIRES",

        "CLIENT_URL",

    ];

    const missingVariables = reqVariables.filter((key) => !process.env[key]);

    if (missingVariables.length > 0) {
        console.error(`Missing env variables:\n ${missingVariables.join("\n")}`);

        process.exit(1);
    }
};

export const env = Object.freeze({
    nodeEnv: process.env.NODE_ENV,

    port: Number(process.env.PORT),

    mongoUri: process.env.MONGO_URI,

    clientUrl: process.env.CLIENT_URL,

    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },

});