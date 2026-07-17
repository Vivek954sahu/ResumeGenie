import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { logger } from  "./utils/logger.js";
import authRouter from "./routes/auth.routes.js";
import { globalErrHandler } from "./middleware/error.middleware.js";

const app = express();

/**
 * ========= Global Middlewares ==========
 */

// Enabling CORS
app.use(cors());

// JSON Body Parser
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

/**
 * ============ Health Check Route ===========
 */
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "App is running...",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});


/**
 * ========== Application Routes ========
 */
app.use("/api/v1/auth", authRouter);

/**
 * ========= Not Found Route =======
 */
app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found."
    });
});

/**
 * ======== Global Error Handler ======
 */
app.use(globalErrHandler);


export default app;