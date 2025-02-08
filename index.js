import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routes/usersRoutes.js'
import galleryItemRouter from './routes/galleryItemsRoutes.js'
import jwt from 'jsonwebtoken'


const app=express()

app.use(bodyParser.json())

const connectionString="mongodb+srv://tester:123@cluster0.m9fws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use((req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ", "")
  
    if(token != null){
      jwt.verify(token,"secret",
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

app.listen(5000,(req,res)=>{
    console.log("Server is running on port no 5000")
})