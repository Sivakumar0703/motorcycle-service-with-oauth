import express from "express";
import { createOrder, verifyPayment } from "../Controllers/razorpay.controller.js";

const razorRouter = express.Router();


razorRouter.post("/api/payment/verify", verifyPayment);
razorRouter.post("/order", createOrder);

export default razorRouter
