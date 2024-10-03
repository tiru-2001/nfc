import express from 'express';
const router = express.Router();
import { addUserData, getUserData } from '../controllers/user.controller.js';
router.post('/add-userdata', addUserData);
router.get('/user/:userInfo', getUserData);
export default router;
