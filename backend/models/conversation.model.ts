import { Schema, model, InferSchemaType, Types } from 'mongoose';

const conversationSchema = new Schema(
	{
		participants: [
			{ type: Schema.Types.ObjectId, ref: 'User', required: true },
		],
		messages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true }],
	},
	{ timestamps: true }
);

export type Conversation = InferSchemaType<typeof conversationSchema> & {
	participants: Types.ObjectId[];
	messages: Types.ObjectId[];
};

export const ConversationModel = model<Conversation>(
	'Conversation',
	conversationSchema
);
