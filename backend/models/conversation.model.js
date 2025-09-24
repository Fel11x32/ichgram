import {model, Schema} from 'mongoose';

const conversationSchema = new Schema({
	participants: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	messages: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Message',
		},
	],
});
export const Conversation = model('Conversation', conversationSchema);
