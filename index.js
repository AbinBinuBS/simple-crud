import express from 'express'
import dotenv from 'dotenv'
import userRouter from './router/userRouter.js'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || 5000
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const accessLogStream = fs.createWriteStream(path.join(process.cwd(), "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }))



app.use('/',userRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})