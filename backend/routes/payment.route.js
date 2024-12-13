import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import { createCheckOutSession } from "../controlers/payment.controller.js";

const router = express.Router();

router.post('/crete-checkout-session', protectRoute, createCheckOutSession)

export default router

