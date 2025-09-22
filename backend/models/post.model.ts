import { Schema, model, InferSchemaType, Types } from 'mongoose';

const postSchema = new Schema(
	{
		caption: { type: String, default: '' },
		image: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{ timestamps: true }
);

export type Post = InferSchemaType<typeof postSchema> & {
	author: Types.ObjectId;
	likes: Types.ObjectId[];
	comments: Types.ObjectId[];
};

export const PostModel = model<Post>('Post', postSchema);
