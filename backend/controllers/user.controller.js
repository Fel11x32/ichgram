import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function formatUser(userDoc, posts = []) {
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
			return res.status(402).json({
				massage: 'Something is missing, please check!',
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

		await User.create({
			username,
			email,
			password: hashedPassword,
		});

		return res.status(201).json({
			message: 'Account created successfully.',
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				massage: 'Something is missing, please check!',
				success: false,
			});
		}

		let user = await User.findOne({ email });
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

		const safeUser = formatUser(user, posts);

		const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.TOKEN_TTL,
		});

		return res
			.cookie('token', token, {
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 1 * 24 * 60 * 60 * 1000,
			})
			.json({
				message: `Welcome back ${safeUser.username}`,
				success: true,
				user: safeUser,
			});
	} catch (error) {
		console.log(error);
	}
};

export const logout = (_, res) => {
	try {
		return res.cookie('token', '', { maxAge: 0 }).json({
			massage: 'Logged out successfully.',
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getProfile = async (req, res) => {
	try {
		const userId = req.params.id;
		let user = await User.findById(userId)
			.populate({ path: 'posts', createdAt: -1 })
			.populate('bookmarks');
		return res.status(200).json({
			user,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const editProfile = async (req, res) => {
	try {
		// const
	} catch (error) {
		console.log(error)
	}
}