import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, Typography, Button } from '@mui/material';
import SuggestedUserItem from './SuggestedUserItem';

const SuggestedUsers = () => {
	const { suggestedUsers = [] } = useSelector(store => store.auth || {});

	return (
		<Box sx={{ my: 5 }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					fontSize: '0.875rem',
				}}
			>
				<Typography
					sx={{
						pr: 2,
						fontWeight: 600,
						color: 'grey.600',
						fontSize: '0.875rem',
					}}
				>
					Suggested for you
				</Typography>
				<Typography
					sx={{ fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}
				>
					See All
				</Typography>
			</Box>

			{suggestedUsers.map(item => (
				<SuggestedUserItem key={item._id} item={item} />
			))}
		</Box>
	);
};

export default SuggestedUsers;
