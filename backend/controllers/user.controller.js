import { User } from '../models/user.model.js';
import { Post } from '../models/post.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

function formatUser(userDoc, posts) {
	return {
		_id: userDoc._id,
		username: userDoc.username,
		email: userDoc.email,
		profilePicture: userDoc.profilePicture,
		bio: userDoc.bio,
		followers: userDoc.followers,
		following: userDoc.following,
		posts,
	};
}

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({
				message: 'Something is missing, please check!',
				success: false,
			});
		}

		const existing = await User.findOne({ email }).lean();
		if (existing) {
			return res.status(409).json({
				message: 'Try different email',
				success: false,
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ username, email, password: hashedPassword });

		return res.status(201).json({
			message: 'Account created successfully.',
			success: true,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				message: 'Something is missing, please check!',
				success: false,
			});
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				message: 'Incorrect email or password',
				success: false,
			});
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return res.status(401).json({
				message: 'Incorrect email or password',
				success: false,
			});
		}

		const populatedPosts = await Promise.all(
			user.posts.map(async postId => {
				const post = await Post.findById(postId);
				if (post.author.equals(user._id)) {
					return post;
				}
				return null;
			})
		);

		const safeUser = formatUser(user, populatedPosts);

		if (!process.env.JWT_SECRET) {
			return res
				.status(500)
				.json({ message: 'JWT secret is not configured', success: false });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.TOKEN_TTL || '1d',
		});

		const isProd = process.env.NODE_ENV === 'production';

		return res
			.cookie('token', token, {
				httpOnly: true,
				sameSite: isProd ? 'none' : 'lax',
				secure: isProd,
				maxAge: 24 * 60 * 60 * 1000,
				path: '/',
			})
			.status(200)
			.json({
				message: `Welcome back ${safeUser.username}`,
				success: true,
				user: safeUser,
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const logout = (_, res) => {
	try {
		const isProd = process.env.NODE_ENV === 'production';
		return res
			.clearCookie('token', {
				httpOnly: true,
				sameSite: isProd ? 'none' : 'lax',
				secure: isProd,
				path: '/',
			})
			.status(200)
			.json({
				message: 'Logged out successfully.',
				success: true,
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const getProfile = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId)
			.select('-password')
			.populate({ path: 'posts', options: { sort: { createdAt: -1 } } })
			.populate('bookmarks');

		if (!user) {
			return res
				.status(404)
				.json({ message: 'User not found', success: false });
		}

		return res.status(200).json({ user, success: true });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const editProfile = async (req, res) => {
	try {
		const userId = req.id;
		const { bio, gender } = req.body;
		const profilePicture = req.file;

		const user = await User.findById(userId).select('-password');
		if (!user) {
			return res
				.status(404)
				.json({ message: 'User not found.', success: false });
		}

		if (bio) user.bio = bio;
		if (gender) user.gender = gender;

		if (profilePicture) {
			const fileUri = getDataUri(profilePicture);
			const cloudResponse = await cloudinary.uploader.upload(fileUri);
			user.profilePicture = cloudResponse.secure_url;
		}

		await user.save();

		return res.status(200).json({
			message: 'Profile updated.',
			success: true,
			user,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const getSuggestedUsers = async (req, res) => {
	try {
		const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
			'-password'
		);

		return res.status(200).json({
			success: true,
			users: suggestedUsers,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

export const followOrUnfollow = async (req, res) => {
	try {
		const followerId = req.id;
		const targetUserId = req.params.id;

		if (followerId === targetUserId) {
			return res.status(400).json({
				message: 'You cannot follow/unfollow yourself',
				success: false,
			});
		}

		const user = await User.findById(followerId);
		const targetUser = await User.findById(targetUserId);

		if (!user || !targetUser) {
			return res.status(404).json({
				message: 'User not found',
				success: false,
			});
		}

		const isFollowing = (user.following || [])
			.map(String)
			.includes(String(targetUserId));

		if (isFollowing) {
			// UNFOLLOW
			await Promise.all([
				User.updateOne(
					{ _id: followerId },
					{ $pull: { following: targetUserId } }
				),
				User.updateOne(
					{ _id: targetUserId },
					{ $pull: { followers: followerId } }
				),
			]);

			return res
				.status(200)
				.json({ message: 'Unfollowed successfully', success: true });
		} else {
			// FOLLOW
			await Promise.all([
				User.updateOne(
					{ _id: followerId },
					{ $addToSet: { following: targetUserId } }
				),
				User.updateOne(
					{ _id: targetUserId },
					{ $addToSet: { followers: followerId } }
				),
			]);

			return res
				.status(200)
				.json({ message: 'Followed successfully', success: true });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};
