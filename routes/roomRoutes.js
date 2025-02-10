import express from "express";
import { createRoom, deleteRoom } from "../controllers/roomsControllers.js";

const roomRoutes=express.Router();

roomRoutes.post("/",createRoom)
roomRoutes.delete("/:roomId",deleteRoom)


export default roomRoutes