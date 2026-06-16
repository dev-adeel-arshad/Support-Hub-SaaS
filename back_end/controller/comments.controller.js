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
        throw new ApiError(400, "Comment message is required");
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    const isOwner =
        ticket.createdBy.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";
    const isAssignee =
        ticket.assignedTo?.toString() === req.user._id.toString();

    if (!isOwner && !isAdmin && !isAssignee) {
        throw new ApiError(403, "Access denied to comment on this ticket");
    }

    const comment = await Comment.create({
        ticket: ticketId,
        user: req.user._id,
        message,
    });

    const populated = await comment.populate(
        "user",
        "username email role"
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            populated,
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