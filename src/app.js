import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = express()


app.use(cors({origin:'*',credentials:true}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('database connected successfully')
}).catch((err)=>{
    console.log(err.message)
})

app.listen(process.env.PORT,()=>{
    console.log(`port is running at ${process.env.PORT}`)
})
