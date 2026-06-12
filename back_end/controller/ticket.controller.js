import { User } from "../models/user.model.js";
import { Ticket } from "../models/ticket.model.js";

import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { uploadOnCloudinary } from "../config/cloudinary.js";


// CREATE TICKET
const createTicket = asyncHandler(async (req, res) => {

    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        throw new ApiError(
            400,
            "Title, description and priority are required"
        );
    }

    let attachment = null;

    const filePath = req.files?.[0]?.path;

    if (filePath) {
        attachment = await uploadOnCloudinary(filePath);
    }

    const ticketId = `SUP-${Date.now()}`;

    const ticket = await Ticket.create({
        ticketId,
        title,
        description,
        priority,
        attachment,
        status: "open",
        createdBy: req.user._id,
        assignedTo: null,
    });

    if (!ticket) {
        throw new ApiError(
            500,
            "Error while creating ticket"
        );
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            ticket,
            "Ticket created successfully"
        )
    );
});


// GET USER TICKETS
const userTickets = asyncHandler(async (req, res) => {

    const tickets = await Ticket.find({
        createdBy: req.user._id,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            tickets,
            "User tickets fetched successfully"
        )
    );
});


// GET SINGLE TICKET
const getTicket = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            400,
            "Ticket id is required"
        );
    }

    const ticket = await Ticket.findOne({
        _id: id,
        createdBy: req.user._id,
    });

    if (!ticket) {
        throw new ApiError(
            404,
            "Ticket not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            ticket,
            "Ticket fetched successfully"
        )
    );
});


// GET ALL TICKETS (ADMIN)
const getAllTickets = asyncHandler(async (req, res) => {

    const tickets = await Ticket.find()
        .populate("createdBy", "username email")
        .populate("assignedTo", "username email");

    return res.status(200).json(
        new ApiResponse(
            200,
            tickets,
            "All tickets fetched successfully"
        )
    );
});


// CHANGE TICKET STATUS (ADMIN)
const changeStatus = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
        "open",
        "in-progress",
        "resolved",
        "closed",
    ];

    if (!allowedStatuses.includes(status)) {
        throw new ApiError(
            400,
            "Invalid status value"
        );
    }

    const updatedTicket =
        await Ticket.findByIdAndUpdate(
            id,
            {
                status,
            },
            {
                new: true,
                runValidators: true,
            }
        );

    if (!updatedTicket) {
        throw new ApiError(
            404,
            "Ticket not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedTicket,
            "Ticket status updated successfully"
        )
    );
});


// ASSIGN TICKET (ADMIN)
const assignTicket = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { assignedTo } = req.body;

    if (!assignedTo) {
        throw new ApiError(
            400,
            "assignedTo field is required"
        );
    }

    const assignedUser =
        await User.findById(assignedTo);

    if (!assignedUser) {
        throw new ApiError(
            404,
            "Assigned user not found"
        );
    }

    const ticket =
        await Ticket.findByIdAndUpdate(
            id,
            {
                assignedTo,
                status: "in-progress",
            },
            {
                new: true,
                runValidators: true,
            }
        );

    if (!ticket) {
        throw new ApiError(
            404,
            "Ticket not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            ticket,
            "Ticket assigned successfully"
        )
    );
});

export {
    createTicket,
    userTickets,
    getTicket,
    getAllTickets,
    changeStatus,
    assignTicket,
};