import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './framework/webserver/routes/index.js'
import errorHandlingMidlleware from './framework/webserver/middlewares/errorHandlingMiddleware.js'
import AppError from './utils/appError.js'

dotenv.config()
const app = express()

app.use(express.json())

app.use(cors({origin:'*',credentials:true}))
app.use(express.urlencoded({ extended: true }));


connectDatabase()

router(app)


app.all('*',(req,res,next)=>{
    next (new AppError('Not found',404))
})
app.use(errorHandlingMidlleware)

app.listen(process.env.PORT,()=>{
    console.log(`port is running at ${process.env.PORT}`)
})
