import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';
import {
	addComment,
	addNewPost,
	bookmarkPost,
	deletePost,
	getAllPost,
	getCommentsOfPost,
	getUserPost,
	toggleLikePost,
} from '../controllers/post.controller.js';

const router = express.Router();

router.post('/addpost', isAuthenticated, upload.single('image'), addNewPost);
router.get('/all', isAuthenticated, getAllPost);
router.get('/userpost/all', isAuthenticated, getUserPost);
router.post('/:id/like', isAuthenticated, toggleLikePost);
router.post('/:id/comment', isAuthenticated, addComment);
router.get('/:id/comments', isAuthenticated, getCommentsOfPost);
router.delete('/delete/:id', isAuthenticated, deletePost);
router.post('/:id/bookmark', isAuthenticated, bookmarkPost);

export default router;
