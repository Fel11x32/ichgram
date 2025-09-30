import express from 'express';
import {
	editProfile,
	followOrUnfollow,
	getProfile,
	getSuggestedUsers,
	login,
	logout,
	register,
} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/:id/profile', isAuthenticated, getProfile);
router.patch(
	'/profile',
	isAuthenticated,
	upload.single('profilePhoto'),
	editProfile
);
router.get('/suggested', isAuthenticated, getSuggestedUsers);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

export default router;
