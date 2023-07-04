import express from 'express'
import authRoute from './authRoute.js';
import postRoutes from './postRoute.js';


const router =(app)=>{
    app.use('/api/v1',authRoute())
    app.use('/api/v1',postRoutes())
}


export default router


