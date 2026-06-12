
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isAdminMiddleware = asyncHandler(
    async (req, res, next) => {
        if (req.user?.role !== "admin") {
            throw new ApiError(
                403,
                "You are not authorized to perform this action."
            );
        }

        next();
    }
);

export { isAdminMiddleware };