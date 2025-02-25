import express from 'express'
import dotenv from 'dotenv'
import userRouter from './router/userRouter.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.PORT || 5000


app.use('/',userRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})