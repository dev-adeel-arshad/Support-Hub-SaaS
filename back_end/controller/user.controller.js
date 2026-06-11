
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const register_user = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const filePath = req.file?.path;

    if (!username || !email || !password || !filePath) {
        throw new ApiError(400, "All fields are required!");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profileImage = await uploadOnCloudinary(filePath);
    if (!profileImage) {
        throw new ApiError(500, "Error while uploading the image on cloudinary");
    }

    const createdUser = await User.create({
        username,
        email,
        password: hashedPassword,
        profileImage,
    });

    const user = await User.findById(createdUser._id).select("-password -accessToken");

    return res.status(201).json(
        new ApiResponse(201, user, "User registered successfully")
    );
});

const login_Controller = asyncHandler(async (req, res) => {
    const { password, email } = req.body;

    if (!password || !email) {
        throw new ApiError(400, "Password and email are required!");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials!");
    }

    const accessToken = jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "7d" }
    );

    user.accessToken = accessToken;
    await user.save();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
       
    };

    const loggedInUser = await User.findById(user._id).select("-password -accessToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken }, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request");
    }

    await User.findByIdAndUpdate(userId, {
        $unset: {
            accessToken: 1,
        },
    });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Logout successful"));
});

const currentuser = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "Current user fetched successfully")
    );
});

export { register_user, login_Controller, logoutUser, currentuser };