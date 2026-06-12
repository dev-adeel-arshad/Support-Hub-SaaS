import { Router } from "express";

import {
    addComment,
    getComments,
} from "../controller/comments.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// ADD COMMENT TO A TICKET
router.post(
    "/ticket/:ticketId",
    authMiddleware,
    addComment
);


// GET ALL COMMENTS OF A TICKET
router.get(
    "/ticket/:ticketId",
    authMiddleware,
    getComments
);

export default router;