import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routes/usersRoutes.js'
import galleryItemRouter from './routes/galleryItemsRoutes.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import categoryRoute from './routes/categoryRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

dotenv.config()//env file


const app=express()

app.use(bodyParser.json())

const connectionString=process.env.MONGO_URL;


app.use((req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ", "")
  
    if(token != null){
      jwt.verify(token,process.env.JWT_KEY,
  
        (err,decoded)=>{
        if(decoded != null){
          req.user = decoded
          next()
        }else{
          next()
        }
  
      }
    )
    }else{
      next()
    }
  
  });



mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to the database")
    }
).catch(
    ()=>{
        console.log("Connection is failed")
    }
)

app.use("/api/users",userRouter)
app.use("/api/gallery",galleryItemRouter)
app.use("/api/category",categoryRoute)
app.use("/api/room",roomRoutes)
app.use("/api/booking",bookingRoutes)

app.listen(5000,(req,res)=>{
    console.log("Server is running on port no 5000")
})