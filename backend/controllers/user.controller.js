import { User } from "../models/user.model.js";

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res.status(401).json({
				massage: 'Something is missing, please check!',
				success: false,
			});
		}

		const existing = await User.findOne({ email });
	} catch (error) {
		console.log(error);
	}
};
