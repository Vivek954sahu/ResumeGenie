import jwt from "jsonwebtoken";
import { BlackList } from "../models/blacklist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { envVar } from "../config/env.js";

export const authenticate = asyncHandler((req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "Unauthorized: Missing Access Token.");
    }

    const isTokenBlacklisted = await BlackList.findOne({ token });

    if (isTokenBlacklisted) throw new ApiError(401, "Invalid Access Token.");

    try {
        const decoded = jwt.verify(token, envVar.jwt.accessSecret);

        req.user = decoded;

        next();
    } catch (error) {

        throw new ApiError(401, "Unauthorized: Expired Access Token.");
        
    }
});