import React from 'react';
import { Box } from '@mui/material';
import Posts from './Posts';

const Feed = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Posts />
		</Box>
	);
};

export default Feed;
