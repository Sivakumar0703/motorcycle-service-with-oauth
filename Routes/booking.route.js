import express from "express";
import { generalServiceBooking, getBookings, repairServiceBooking, waterWashBooking } from "../Controllers/booking.controller.js";

const bookingRouter = express.Router();


bookingRouter.get("/", getBookings);
bookingRouter.post("/general/service/addbooking", generalServiceBooking);
bookingRouter.post("/repair/service/addbooking", repairServiceBooking);
bookingRouter.post("/water/wash/service/addbooking", waterWashBooking);

export default bookingRouter