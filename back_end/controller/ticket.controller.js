import { User } from "../models/user.model.js";
import { Ticket } from "../models/ticket.model.js";
import { AssignablePerson } from "../models/assignable.model.js";

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
    })
    .populate("assignedTo", "username email")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, tickets, "User tickets fetched successfully")
    );
});


// GET SINGLE TICKET
const getTicket = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const ticket = await Ticket.findById(id)
        .populate("createdBy", "username email")
        .populate("assignedTo", "username email");

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    const isOwner =
        ticket.createdBy._id.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
        throw new ApiError(403, "Access denied");
    }

    return res.status(200).json(
        new ApiResponse(200, ticket, "Ticket fetched successfully")
    );
});


// GET ALL TICKETS (ADMIN)
const getAllTickets = asyncHandler(async (req, res) => {

    const { status, priority, search } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    const tickets = await Ticket.find(filter)
        .populate("createdBy", "username email")
        .populate("assignedTo", "username email")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            tickets,
            "Filtered tickets fetched successfully"
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
    const { assignedTo, assignedToEmail } = req.body;

    if (!assignedTo && !assignedToEmail) {
        throw new ApiError(
            400,
            "assignedTo or assignedToEmail field is required"
        );
    }

    let assignedUser = null;

    if (assignedToEmail) {
        const isAllowed = await AssignablePerson.findOne({ email: assignedToEmail });
        if (!isAllowed) {
            throw new ApiError(
                403,
                "This user is not in the assignable people list"
            );
        }

        assignedUser = await User.findOne({ email: assignedToEmail });
    } else {
        assignedUser = await User.findById(assignedTo);
    }

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
                assignedTo: assignedUser._id,
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