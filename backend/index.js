import 'dotenv/config';
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import { app, server } from './socket/socket.js';

import './models/user.model.js';
import './models/post.model.js';
import './models/comment.model.js';

import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import messageRoutes from './routes/message.route.js';

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

app.get('/', (_, res) => {
	return res
		.status(200)
		.json({ message: "I'm coming from backend", success: true });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/message', messageRoutes);

const PORT = process.env.PORT || 3000;

try {
	await connectDB();
	server.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`);
	});
} catch (err) {
	console.error('DB connection failed:', err);
	process.exit(1);
}
