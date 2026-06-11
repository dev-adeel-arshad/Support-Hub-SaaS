import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        console.log("Auth Middleware Invoked",req.cookies, req.headers);
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
            console.log("Token from Request:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided!"
            });
        }

        const decoded = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET_KEY
        );
        console.log("Decoded Token:", decoded);

        const user = await User.findById(decoded.id)
            .select("-password -accessToken");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token!",
            error: error.message
        });
    }
};

export { authMiddleware };