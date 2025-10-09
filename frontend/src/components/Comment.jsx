import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const Comment = ({ comment }) => {
	return (
		<Box sx={{ my: 2 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
				<Avatar
					src={comment?.author?.profilePicture}
					alt={comment?.author?.username}
					sx={{ width: 32, height: 32, fontSize: 12 }}
				>
					{comment?.author?.username
						? comment.author.username.slice(0, 2).toUpperCase()
						: 'CN'}
				</Avatar>

				<Typography
					component='div'
					variant='body2'
					sx={{ fontWeight: 600, fontSize: '0.875rem' }}
				>
					{comment?.author?.username}
					<Typography
						component='span'
						sx={{ fontWeight: 400, pl: 0.5, fontSize: '0.875rem' }}
					>
						{comment?.text}
					</Typography>
				</Typography>
			</Box>
		</Box>
	);
};

export default Comment;
