import sharp from 'sharp';
import cloudinary from '../utils/cloudinary.js';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';
import { Comment } from '../models/comment.model.js';

export const addNewPost = async (req, res) => {
	try {
		const { caption } = req.body;
		const image = req.file;
		const authorId = req.id;

		if (!image) return res.status(400).json({ message: 'Image required' });

		const optimizedImageBuffer = await sharp(image.buffer)
			.resize({ width: 800, height: 800, fit: 'inside' })
			.toFormat('jpeg', { quality: 80 })
			.toBuffer();

		const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
			'base64'
		)}`;
		const cloudResponse = await cloudinary.uploader.upload(fileUri);
		const post = await Post.create({
			caption,
			image: cloudResponse.secure_url,
			author: authorId,
		});

		const user = await User.findById(authorId);
		if (user) {
			user.posts.push(post._id);
			await user.save();
		}

		await post.populate({ path: 'author', select: '-password' });

		return res.status(201).json({
			message: 'New post added',
			post,
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const getAllPost = async (req, res) => {
	try {
		const page = Math.max(parseInt(req.query.page || '1', 10), 1);
		const limit = Math.min(
			Math.max(parseInt(req.query.limit || '10', 10), 1),
			50
		);
		const skip = (page - 1) * limit;

		const [posts, total] = await Promise.all([
			Post.find({})
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.populate({ path: 'author', select: 'username profilePicture' })
				.populate({
					path: 'comments',
					options: { sort: { createdAt: -1 } },
					populate: { path: 'author', select: 'username profilePicture' },
				})
				.lean(),
			Post.countDocuments({}),
		]);

		return res.status(200).json({
			success: true,
			posts,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const getUserPost = async (req, res) => {
	try {
		const authorId = req.id;
		const posts = await Post.find({ author: authorId })
			.sort({ createdAt: -1 })
			.populate({
				path: 'author',
				select: 'username, profilePicture',
			})
			.populate({
				path: 'comments',
				sort: { createdAt: -1 },
				populate: {
					path: 'author',
					select: 'username profilePicture',
				},
			});
		return res.status(200).json({
			posts,
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const toggleLikePost = async (req, res) => {
	try {
		const userId = req.id;
		const postId = req.params.id;

		const post = await Post.findById(postId);
		if (!post)
			return res
				.status(404)
				.json({ message: 'Post not found', success: false });

		const alreadyLiked = (post.likes || [])
			.map(String)
			.includes(String(userId));

		const update = alreadyLiked
			? { $pull: { likes: userId } }
			: { $addToSet: { likes: userId } };

		await Post.updateOne({ _id: postId }, update);

		return res.status(200).json({
			message: alreadyLiked ? 'Post unlike' : 'Post like',
			success: true,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const addComment = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.id;
		const { text } = req.body;

		if (!text || !text.trim()) {
			return res
				.status(400)
				.json({ message: 'Text is required', success: false });
		}

		const post = await Post.findById(postId);
		if (!post) {
			return res
				.status(404)
				.json({ message: 'Post not found', success: false });
		}

		const comment = await Comment.create({
			text: text.trim(),
			author: userId,
			post: postId,
		});

		await comment.populate({
			path: 'author',
			select: 'username profilePicture',
		});

		await Post.updateOne({ _id: postId }, { $push: { comments: comment._id } });

		return res.status(201).json({
			message: 'Comment added',
			success: true,
			comment,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const getCommentsOfPost = async (req, res) => {
	try {
		const postId = req.params.id;

		const comments = await Comment.find({ post: postId })
			.sort({ createdAt: -1 })
			.populate('author', 'username profilePicture');

		if (comments.length === 0) {
			return res.status(404).json({
				message: 'No comments found for this post',
				success: false,
			});
		}

		return res.status(200).json({
			success: true,
			comments,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const deletePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const authorId = req.id;

		const post = await Post.findById(postId);
		if (!post) {
			return res
				.status(404)
				.json({ message: 'Post not found', success: false });
		}

		if (String(post.author) !== String(authorId)) {
			return res.status(403).json({ message: 'Unauthorized', success: false });
		}

		await Post.findByIdAndDelete(postId);
		await User.updateOne({ _id: authorId }, { $pull: { posts: postId } });
		await Comment.deleteMany({ post: postId });

		if (post.imagePublicId)
			await cloudinary.uploader.destroy(post.imagePublicId);

		return res.status(200).json({
			success: true,
			message: 'Post deleted',
			postId,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: 'Server error' });
	}
};

export const bookmarkPost = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.id;

		const post = await Post.findById(postId);
		if (!post) {
			return res
				.status(404)
				.json({ message: 'Post not found', success: false });
		}

		const user = await User.findById(userId);

		const alreadyBookmarked = user.bookmarks.some(
			id => id.toString() === postId
		);

		if (alreadyBookmarked) {
			await User.updateOne({ _id: userId }, { $pull: { bookmarks: postId } });
			return res.status(200).json({
				type: 'unsaved',
				message: 'Post removed from bookmark',
				success: true,
			});
		} else {
			await User.updateOne(
				{ _id: userId },
				{ $addToSet: { bookmarks: postId } }
			);
			return res.status(200).json({
				type: 'saved',
				message: 'Post bookmarked',
				success: true,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};
