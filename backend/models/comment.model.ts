import { Schema, model, InferSchemaType, Types } from 'mongoose';

const commentSchema = new Schema(
	{
		text: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
	},
	{ timestamps: true }
);

export type Comment = InferSchemaType<typeof commentSchema> & {
	author: Types.ObjectId;
	post: Types.ObjectId;
};

export const CommentModel = model<Comment>('Comment', commentSchema);
