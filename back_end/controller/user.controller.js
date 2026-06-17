
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Ticket } from "../models/ticket.model.js";
// CONTROLLER FOR REGISTERING THE USER
const register_user = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const filePath = req.file?.path;

    if (!username || !email || !password ) {
        throw new ApiError(400, "All fields are required!");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let profileImage = null;

    if (filePath) {
        profileImage = await uploadOnCloudinary(filePath);
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

// CONTROLLER FOR LOGGIN IN USER 
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

    const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https" || process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        secure: isSecure,
        sameSite: isSecure ? "none" : "lax",
        path: "/",
    };

    const loggedInUser = await User.findById(user._id).select("-password -accessToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken }, "User logged in successfully"));
});

// CONTROLLER FOR LOGGING OUT USER
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
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Logout successful"));
});

// CONTROLLER FOR GETTING CURRENT USER
const currentuser = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "Current user fetched successfully")
    );
});
// CONTROLLER FOR DELETING A USER (ADMIN ONLY)
const delete_user = asyncHandler(async (req, res) => {
    const userId = req.params?.id || req.query?.id;
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(
        new ApiResponse(200, {}, "User deleted successfully")
    );
});

// GET ALL USERS (ADMIN ONLY)
const getAllUsers = asyncHandler(async (req, res) => {
    const filter = {};

    if (req.query.role) {
        filter.role = req.query.role;
    }

    const users = await User.find(filter)
        .select("-password -accessToken")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    );
});

//TICKETS STATS (ADMIN ONLY)
const ticketsStat = asyncHandler(async (req, res) => {

    const stats = await Ticket.aggregate([
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    const dashboardStats = {
        totalTickets: 0,
        openTickets: 0,
        inProgressTickets: 0,
        resolvedTickets: 0,
        closedTickets: 0,
    };

    stats.forEach((item) => {

        dashboardStats.totalTickets += item.count;

        if (item._id === "open") {
            dashboardStats.openTickets = item.count;
        }

        if (item._id === "in-progress") {
            dashboardStats.inProgressTickets = item.count;
        }

        if (item._id === "resolved") {
            dashboardStats.resolvedTickets = item.count;
        }

        if (item._id === "closed") {
            dashboardStats.closedTickets = item.count;
        }

    });

    return res.json(
        new ApiResponse(
            200,
            dashboardStats,
            "Dashboard stats fetched successfully"
        )
    );

});
const updateUserRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ["user", "admin", "assignee"];

    if (!role || !allowedRoles.includes(role)) {
        throw new ApiError(400, "Invalid role value");
    }

    if (req.user._id.toString() === id && role !== "admin") {
        throw new ApiError(400, "Cannot change your own role");
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true, runValidators: true }
    ).select("-password -accessToken");

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "User role updated successfully")
    );
});

const promoteToAssignee = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role === "assignee") {
        throw new ApiError(400, "User is already an assignee");
    }

    user.role = "assignee";
    await user.save();

    const updatedUser = await User.findById(user._id).select("-password -accessToken");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "User promoted to assignee successfully")
    );
});

const demoteFromAssignee = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role !== "assignee") {
        throw new ApiError(400, "User is not an assignee");
    }

    user.role = "user";
    await user.save();

    const updatedUser = await User.findById(user._id).select("-password -accessToken");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "User demoted from assignee successfully")
    );
});

export { register_user, login_Controller, logoutUser, currentuser, delete_user, getAllUsers, ticketsStat, updateUserRole, promoteToAssignee, demoteFromAssignee };