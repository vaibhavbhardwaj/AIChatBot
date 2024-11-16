import express from "express";
import { connectToDb } from "./db/connection.js";
import appRouter from "./route/index.js";
import morgan from 'morgan'
import cors from 'cors'

import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config()

const app = express()

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
//app.use(morgan("dev"))


app.use('/api/v1',appRouter)

app.get("/",(req,res,next)=>{
  console.log("inside")
  res.send("hello")
})


const startup = async()=>{
  const port = process.env.PORT || 5000
  try {
    await connectToDb()
    app.listen(port,()=>console.log("server startred running on port",port))
  } catch (error) {
    console.log(error)
  }
  

}
startup()

