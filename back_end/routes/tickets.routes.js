import { Router } from "express";

import {
    createTicket,
    userTickets,
    getTicket,
    getAllTickets,
    changeStatus,
    assignTicket,
} from "../controller/ticket.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


// USER ROUTES

router.post(
    "/create-ticket",
    authMiddleware,
    upload.array("attachments", 5),
    createTicket
);

router.get(
    "/my-tickets",
    authMiddleware,
    userTickets
);

// ADMIN ROUTES

router.get(
    "/all",
    authMiddleware,
    isAdminMiddleware,
    getAllTickets
);

router.get(
    "/:id",
    authMiddleware,
    getTicket
);

router.patch(
    "/:id/status",
    authMiddleware,
    isAdminMiddleware,
    changeStatus
);

router.patch(
    "/:id/assign",
    authMiddleware,
    isAdminMiddleware,
    assignTicket
);

export default router;