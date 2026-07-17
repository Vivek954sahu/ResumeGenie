import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginUserCtrl, registerUserCtrl } from "../controllers/auth.controller.js";

const authRouter = express.Router();

/**
 * @route POST /api/v1/auth/register
 */
authRouter.post("/register", asyncHandler(registerUserCtrl));

/**
 * @route POST /api/v1/auth/login
 */
authRouter.post("/login", asyncHandler(loginUserCtrl));


export default authRouter;