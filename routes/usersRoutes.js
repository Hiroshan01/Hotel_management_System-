import express from 'express'
import { postUsers,getUsers,loginUser} from '../controllers/userControllers.js'

const userRouter = express.Router()


userRouter.post("/",postUsers)
userRouter.get("/",getUsers)
userRouter.post("/login",loginUser)

//userRouter.post("/login",loginUser)





export default userRouter;