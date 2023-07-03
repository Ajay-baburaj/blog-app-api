import express from 'express'
import authRoute from './authRoute.js';


const router =(app)=>{
    app.use('/api/v1',authRoute())
}


export default router


