import { Router } from "express";
import {
  getMyAssignablePerson,
  getAssignablePeople,
  createAssignablePerson,
  deleteAssignablePerson,
} from "../controller/assignable.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdminMiddleware } from "../middlewares/isAdmin.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/me", getMyAssignablePerson);
router.get("/", isAdminMiddleware, getAssignablePeople);
router.post("/", isAdminMiddleware, createAssignablePerson);
router.delete("/:id", isAdminMiddleware, deleteAssignablePerson);

export default router;
