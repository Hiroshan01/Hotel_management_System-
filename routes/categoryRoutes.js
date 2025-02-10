import express from "express";
import {createCategory, deleteCatagory, getCategory, getCategoryByName} from "../controllers/categoryControllers.js"

const categoryRoute=express.Router()

categoryRoute.post("/",createCategory)
categoryRoute.delete("/:name",deleteCatagory)
categoryRoute.get("/:name",getCategoryByName)
categoryRoute.get("/",getCategory)


export default categoryRoute;