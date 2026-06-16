
import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";

import { validate } from "../middlewares/dataValidator.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { regesterUser, loginData } from "../validaters/userDataValidator.js";

import { register_user, login_Controller, logoutUser, currentuser, delete_user, getAllUsers, ticketsStat, updateUserRole, promoteToAssignee, demoteFromAssignee } from "../controller/user.controller.js";

import { createRateLimit } from "../middlewares/rateLimiter.middleware.js";

import {isAdminMiddleware} from "../middlewares/isAdmin.middleware.js";





const registerRateLimit = createRateLimit({ windowMs: 15 * 60 * 1000, limit: 5 });
const loginRateLimit = createRateLimit({ windowMs : 15 * 60 * 1000, limit: 5 }); 

const router = Router();
// PUBLIC ROUTES
router.post("/register-user",
  (req, res, next) => {
    console.log("REGISTER ROUTE HIT");
    next();
  }, registerRateLimit, upload.single("profileImage"), validate(regesterUser), register_user);
router.post("/login", loginRateLimit, validate(loginData), login_Controller);

// PROTECTED ROUTES
router.use(authMiddleware);
router.post("/logout", logoutUser);
router.get("/current-user", currentuser);
router.get("/admin/users", isAdminMiddleware, getAllUsers);
router.patch("/admin/users/:id/role", isAdminMiddleware, updateUserRole);
router.post("/admin/assignees/promote", isAdminMiddleware, promoteToAssignee);
router.post("/admin/assignees/demote", isAdminMiddleware, demoteFromAssignee);
router.delete('/delete-user/:id', isAdminMiddleware, delete_user);
router.get("/admin/dashboard",isAdminMiddleware,ticketsStat)



export default router; 