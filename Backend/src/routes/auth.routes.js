import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getMeCtrl, loginUserCtrl, logoutUserCtrl, registerUserCtrl } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

/**
 * @route POST /api/v1/auth/register
 */
authRouter.post("/register", asyncHandler(registerUserCtrl));

/**
 * @route POST /api/v1/auth/login
 */
authRouter.post("/login", asyncHandler(loginUserCtrl));

/**
 * @route POST /api/v1/auth/logout
 */
authRouter.post("/logout", asyncHandler(logoutUserCtrl));

/**
 * @route GET /api/v1/auth/get-me
 */
authRouter.get("/get-me", authenticate, asyncHandler(getMeCtrl));


export default authRouter;