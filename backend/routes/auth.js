import express from "express";
import { signup, logout, login, refreshToken} from "../controlers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login );
router.post("/logout", logout);
router.post("/refresh-token", refreshToken); 
//router.get("/profile", getProfile);

export default router;