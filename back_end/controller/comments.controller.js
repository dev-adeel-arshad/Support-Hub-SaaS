import { Comment } from "../models/comment.model.js";
import { Ticket } from "../models/ticket.model.js";

import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// ADD COMMENT
const addComment = asyncHandler(async (req, res) => {

    const { ticketId } = req.params;
    const { message } = req.body;

    if (!message?.trim()) {
        throw new ApiError(
            400,
            "Comment message is required"
        );
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(
            404,
            "Ticket not found"
        );
    }

    const comment = await Comment.create({
        ticket: ticketId,
        user: req.user._id,
        message,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            comment,
            "Comment added successfully"
        )
    );
});


// GET ALL COMMENTS OF A TICKET
const getComments = asyncHandler(async (req, res) => {

    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(
            404,
            "Ticket not found"
        );
    }

    const comments = await Comment.find({
        ticket: ticketId,
    })
        .populate(
            "user",
            "username email role"
        )
        .sort({ createdAt: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            comments,
            "Comments fetched successfully"
        )
    );
});

export {
    addComment,
    getComments,
};