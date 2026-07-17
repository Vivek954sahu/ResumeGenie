import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required."],
        unique: [true, "username already taken."],
        trim: true,
        lowercase: true,
        minlength: [3, "username must be atleast 3 characters."],
        maxlength: [30, "username can not exceed 30 characters."],
        match: [/^[a-zA-Z0-9_]+$/, "username can only contain letters, numbers and underscores."]
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email address should be unique."],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address."],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    }
}, {
    timestamps: true
});

export const User = mongoose.model("Users", userSchema);