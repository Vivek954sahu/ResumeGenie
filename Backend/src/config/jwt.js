import jwt from "jsonwebtoken";
import { envVar } from "./env.js";

export const generateAccessToken = async(payload) => {
    return jwt.sign(payload, envVar.jwt.accessSecret, { expiresIn: envVar.jwt.accessExpiresIn });
};