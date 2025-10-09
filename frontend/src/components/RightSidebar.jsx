import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
	const { user } = useSelector(store => store.auth);

	return (
		<Box
			sx={{
				position: 'sticky',
				alignSelf: 'start',
				top: 0,
				right: 0,
				zIndex: 10,
				width: 'fit-content',
				my: 5,
				pr: '16px',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Link
					to={`/profile/${user?._id}`}
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<Avatar
						src={user?.profilePicture}
						alt='post_image'
						sx={{ width: 48, height: 48, fontSize: 14 }}
					>
						{user?.username ? user.username.slice(0, 2).toUpperCase() : 'CN'}
					</Avatar>
				</Link>

				<Box>
					<Typography
						variant='body2'
						sx={{ fontWeight: 600, fontSize: '0.875rem' }}
					>
						<Link
							to={`/profile/${user?._id}`}
							style={{
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							{user?.username}
						</Link>
					</Typography>

					<Typography
						variant='body2'
						sx={{
							color: 'grey.600',
							fontSize: '0.875rem',
						}}
					>
						{user?.bio || 'Bio here...'}
					</Typography>
				</Box>
			</Box>

			<SuggestedUsers />
		</Box>
	);
};

export default RightSidebar;
