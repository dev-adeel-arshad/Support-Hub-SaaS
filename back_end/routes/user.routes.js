
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/userDataValidator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { regesterUser, loginData } from "../validaters/userDataValidator.js";
import { register_user, login_Controller, logoutUser, currentuser } from "../controller/user.controller.js";

const router = Router();

router.get("/hello", (req, res) => {
    return res.send('Hello i am from backend server !!')
})

router.post("/register", upload.single("profileImage"), validate(regesterUser), register_user);
router.post("/login", validate(loginData), login_Controller);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, currentuser);

export default router;