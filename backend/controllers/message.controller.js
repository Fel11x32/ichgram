import { Conversation } from '../models/conversation.model.js';
import { Message } from '../models/message.model.js';

export const sendMessage = async (req, res) => {
	try {
		const senderId = req.id;
		const receiverId = req.params.id;
		const { message } = req.body;

		if (!message || !message.trim()) {
			return res
				.status(400)
				.json({ success: false, message: 'Message text is required' });
		}

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = await Message.create({
			senderId,
			receiverId,
			message,
		});

		conversation.messages.push(newMessage._id);
		await conversation.save();

		return res.status(201).json({
			success: true,
			newMessage,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};

const getMessage = async (req, res) => {
	try {
		const senderId = req.id;
		const receiverId = req.params.id;
		const conversation = await Conversation.find({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation)
			return res.status(200).json({ success: true, message: [] });

		return res
			.status(200)
			.json({ success: true, message: conversation?.messages });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Server error', success: false });
	}
};
