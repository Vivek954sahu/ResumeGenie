import {envVar, loadEnv } from "./src/config/env.js";
import app from "./src/app.js";
import http from "http";
import { connectDB } from "./src/config/db.js";
import { logger } from "./src/utils/logger.js";

loadEnv();

const server = http.createServer(app);

const PORT = envVar.port || 3000;

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        // DB connection success
        server.listen(PORT, () => {
            logger.info(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        logger.error("Failed to start server!", {
            error: error.message
        });

        process.exit(1);
    }
};

startServer();