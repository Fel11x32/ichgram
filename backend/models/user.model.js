import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true, index: true },
		email: { type: String, required: true, unique: true, index: true },
		password: { type: String, required: true },
		profilePicture: { type: String, default: '' },
		bio: { type: String, default: '' },
		gender: { type: String, enum: ['male', 'female'] },
		followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
		following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
		posts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
		bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
	},
	{ timestamps: true, versionKey: false }
);

export const User = model('User', userSchema);
