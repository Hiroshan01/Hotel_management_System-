import express from "express";
import { createBooking, getBooking, getBookingById, updateBooking } from "../controllers/bookingControllers.js";


const bookingRoutes=express.Router()

bookingRoutes.post("/",createBooking)
bookingRoutes.get("/:bookingId",getBookingById)
bookingRoutes.get("/",getBooking)

bookingRoutes.put("/:bookingId",updateBooking)

export default bookingRoutes