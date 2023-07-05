import express from 'express'
import authRoute from './authRoute.js';
import postRoutes from './postRoute.js';
import commentRoutes from './commentRoute.js';


const router =(app)=>{
    app.use('/api/v1',authRoute())
    app.use('/api/v1',postRoutes())
    app.use('/api/v1',commentRoutes())
}


export default router


