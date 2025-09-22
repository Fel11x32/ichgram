import { Schema, model, InferSchemaType, Types } from 'mongoose';

const messageSchema = new Schema(
	{
		senderId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		receiverId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export type Message = InferSchemaType<typeof messageSchema> & {
	senderId: Types.ObjectId;
	receiverId: Types.ObjectId;
};

export const MessageModel = model<Message>('Message', messageSchema);
