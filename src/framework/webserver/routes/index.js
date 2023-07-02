import express from 'express'
import authRoute from './authRoute.js';


const router =(app)=>{
    
    app.use('/api',authRoute())
}


export default router


