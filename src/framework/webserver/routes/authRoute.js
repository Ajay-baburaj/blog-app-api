import express from 'express'
import authController from '../../../adapters/controllers/authController.js'

const authRoute = () => {
    const router = express.Router()
    router.post('/signup',authController().signup)
    router.post('/login',authController().login)   
return router
}

export default authRoute