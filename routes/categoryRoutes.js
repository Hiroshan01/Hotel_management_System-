import express from "express";
import {createCategory, deleteCatagory} from "../controllers/categoryControllers.js"

const categoryRoute=express.Router()

categoryRoute.post("/",createCategory)
categoryRoute.delete("/:name",deleteCatagory)


export default categoryRoute;