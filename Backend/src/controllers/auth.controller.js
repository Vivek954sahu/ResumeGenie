import { generateAccessToken } from "../config/jwt.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";

/** 
 * @name registerUserCtrl
 * @desc register a new user, expects username, email, password in req body.
 * @access Public 
 */
export const registerUserCtrl = async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        throw new ApiError (400, "Missing required credentials!");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if(existingUser) {
        throw new ApiError (409, "User already exists with provide email or username!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    const accessToken = generateAccessToken({id: user._id, username: user.username });

    res.cookie("token", accessToken);

    res.status(201).json({
        message: "User created successfully.",
        user: {
            userId: user._id,
            username: user.username,
            email: user.email
        }
    });
};

/**
 * 
 * @name loginUserCtrl
 * @desc login a user, expects email and password in req body.
 * @access Public
 */
export const loginUserCtrl = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if(!user) throw new ApiError (400, "Invalid Email or password!");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) throw new ApiError (400, "Invalid Email or password!");

    const accessToken = generateAccessToken({id: user._id, username: user.username });

    res.cookie("token", accessToken);

    res.status(200).json({
        success: true,
        message: "User logged in successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};