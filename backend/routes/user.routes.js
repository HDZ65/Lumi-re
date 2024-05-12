import express from 'express';
import {registerUser, loginUser} from './../Controllers/user.controller.js';
const router = express.Router();
import protectRoute from '../middleware/protectRoute.js';

router.post('/register', registerUser)
router.post('/login', loginUser)


export default router;

