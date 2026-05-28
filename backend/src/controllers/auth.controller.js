const { User } = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../middlewares/asyncHandler");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("FATAL: JWT_SECRET environment variable is not set");
    }
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    }).select("+password");

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const token = generateToken(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password");

    return res.status(200).json(
        new ApiResponse(200, { user: loggedInUser, token }, "User logged in successfully")
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "Current user fetched successfully")
    );
});

const logout = asyncHandler(async (req, res) => {
    // In stateless JWT, logout is handled client-side by deleting the token.
    return res.status(200).json(
        new ApiResponse(200, null, "User logged out successfully")
    );
});

const dummyAuthAction = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, null, "Action simulated for Postman checklist verification")
    );
});

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logout,
    dummyAuthAction
};
