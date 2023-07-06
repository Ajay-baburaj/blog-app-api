import express from 'express';
import authController from '../../../adapters/controllers/authController.js';

// Define the authentication routes
const authRoute = () => {
    const router = express.Router();
    
    // Route for user signup - registers a new user
    router.post('/signup', authController().signup);
    
    // Route for user login - allows users to log in
    router.post('/login', authController().login);
    
    // Route for generating a new access token using a refresh token
    router.post('/refresh/token', authController().generateAccesToken);
    
    return router;
}

export default authRoute;
