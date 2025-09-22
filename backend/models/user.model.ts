import { Schema, model, InferSchemaType, Types } from 'mongoose';

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profilePicture: { type: String, default: '' },
		bio: { type: String, default: '' },
		gender: { type: String, enum: ['male', 'female'] },
		followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
		bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	},
	{ timestamps: true }
);

export type User = InferSchemaType<typeof userSchema> & {
	followers: Types.ObjectId[];
	following: Types.ObjectId[];
	posts: Types.ObjectId[];
	bookmarks: Types.ObjectId[];
};

export const UserModel = model<User>('User', userSchema);
