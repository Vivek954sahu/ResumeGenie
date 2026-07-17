import mongoose from "mongoose";
import { envVar } from "./env.js";
import { logger } from "../utils/logger.js";

let isConnect = false;

// mongoose global config setting
mongoose.set("strictQuery", true);

// MongoDB Connection
export const connectDB = async () => {
    if (isConnect) {
        logger.warn("MongoDB is already connected!");
    }

    try {
        console.log(envVar.mongoUri);
        const conn = await mongoose.connect(envVar.mongoUri, {
            autoIndex: envVar.nodeEnv != "production",
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 20,
            minPoolSize: 5,
            maxIdleTimeMS: 30000,
        });

        isConnect = true;

        logger.info(`MongoDB Server connected successfully! : {
            host: ${conn.connection.host},
            db: ${conn.connection.name}}`);

    } catch (error) {
        logger.fatal({
            error: error.message,
        }, "Failed to connect MongoDB!.");

        process.exit(1);
    }
};

/**
 * MongoDB connection lifecycle events
 */
mongoose.connection.on("connected", () => {
    logger.info("MongoDB connection established.");
});

mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB connection lost!");

    isConnect = false;
});

mongoose.connection.on("reconnected", () => {
    logger.info("MongoDB reconnected.");
});

mongoose.connection.on("error", (error) => {
    logger.error({
        error: error.message,
    }, "MongoDB connection error.");
});

/**
 * Graceful shutdown 
 */
const gracefulShutdown = async (signal) => {
    try {
        logger.warn(`${signal} received! Closing MongoDB connection.`);

        await mongoose.connection.close(false);

        logger.info("MongoDB connection closed.");

        process.exit(0);
    } catch (error) {
        logger.fatal(
            {
                error: error.message,
            },
            "Error while closing MongoDB connection."
        );

        process.exit(1);
    }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));