import express from "express";
const router = express.Router()

//middleware
import { requireSignIn } from "../middlewares"

//controllers
import { register, login, currentUser, forgotPassword } from "../controllers/auth";

router.post("/register", register)
router.post("/login", login)
router.get("/current-user", requireSignIn, currentUser)
router.post("/forgot-password", forgotPassword)

module.exports = router;