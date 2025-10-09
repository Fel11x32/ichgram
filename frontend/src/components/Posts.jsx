import React from 'react';
import { Box } from '@mui/material';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
	const { posts } = useSelector(store => store.post);

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: 10,
				maxWidth: '700px',
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
