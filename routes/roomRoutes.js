import express from "express";
import { createRoom, deleteRoom, getRooms, updateRooms } from "../controllers/roomsControllers.js";

const roomRoutes=express.Router();

roomRoutes.post("/",createRoom)
roomRoutes.delete("/:roomId",deleteRoom)
roomRoutes.get("/:roomId",getRooms)
roomRoutes.put("/:roomId",updateRooms)


export default roomRoutes