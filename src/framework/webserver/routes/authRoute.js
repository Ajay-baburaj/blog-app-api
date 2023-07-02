import authController from '../../../adapters/controllers/authController.js'
import express from 'express'

const authRoute = () => {
    const router = express.Router()


 router.post('/signup',authController().signup)   
return router
}

export default authRoute