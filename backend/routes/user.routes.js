import express from 'express';
import { register, login, logout, updateProfile } from '../controllers/user.controller.js';
import { singleUpload } from '../middleware/multer.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

// Routes
router.route("/register").post(singleUpload,register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route("/profile/update").put(isAuthenticated,singleUpload,updateProfile);

export default router;
