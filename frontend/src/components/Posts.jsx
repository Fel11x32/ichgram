import React from 'react';
import { Box } from '@mui/material';
import Post from './Post';

const Posts = () => {
	const posts = [
		{
			_id: '1',
			username: 'john_doe',
			profilePicture: 'https://i.pravatar.cc/100?img=1',
			image: 'https://picsum.photos/600/400?random=1',
			caption: 'Enjoying the sunny day 🌞',
			likes: 125,
			comments: 8,
		},
		{
			_id: '2',
			username: 'jane_smith',
			profilePicture: 'https://i.pravatar.cc/100?img=2',
			image: 'https://picsum.photos/600/400?random=2',
			caption: 'Coffee time ☕',
			likes: 78,
			comments: 5,
		},
		{
			_id: '3',
			username: 'alex_k',
			profilePicture: 'https://i.pravatar.cc/100?img=3',
			image: 'https://picsum.photos/600/400?random=3',
			caption: 'New project is live 🚀',
			likes: 201,
			comments: 14,
		},
		{
			_id: '4',
			username: 'maria',
			profilePicture: 'https://i.pravatar.cc/100?img=4',
			image: 'https://picsum.photos/600/400?random=4',
			caption: 'Weekend vibes ✨',
			likes: 92,
			comments: 3,
		},
		{
			_id: '5',
			username: 'maria',
			profilePicture: 'https://i.pravatar.cc/100?img=4',
			image: 'https://picsum.photos/600/400?random=4',
			caption: 'Weekend vibes ✨',
			likes: 92,
			comments: 3,
		},
	];

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: 10,
				maxWidth: '700px'
			}}
		>
			{posts.map(post => (
				<Box key={post._id}>
					<Post post={post} />
				</Box>
			))}
		</Box>
	);
};

export default Posts;
