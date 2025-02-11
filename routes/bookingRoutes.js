import express from "express";
import { createBooking, deleteBookingById, getBooking, getBookingById, updateBooking } from "../controllers/bookingControllers.js";


const bookingRoutes=express.Router()

bookingRoutes.post("/",createBooking)
bookingRoutes.get("/:bookingId",getBookingById)
bookingRoutes.get("/",getBooking)

bookingRoutes.put("/:bookingId",updateBooking)
bookingRoutes.delete("/:bookingId",deleteBookingById)

export default bookingRoutes