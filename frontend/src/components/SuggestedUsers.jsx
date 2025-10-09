import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, Typography } from '@mui/material';

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
					sx={{pr: 2, fontWeight: 600, color: 'grey.600', fontSize: '0.875rem' }}
				>
					Suggested for you
				</Typography>
				<Typography
					sx={{
						fontWeight: 500,
						cursor: 'pointer',
						fontSize: '0.875rem',
					}}
				>
					See All
				</Typography>
			</Box>

			{suggestedUsers.map(user => (
				<Box
					key={user._id}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 2,
						my: 2,
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
						<Link
							to={`/profile/${user?._id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<Avatar
								src={user?.profilePicture}
								alt='post_image'
								sx={{ width: 40, height: 40, fontSize: 12 }}
							>
								{user?.username
									? user.username.slice(0, 2).toUpperCase()
									: 'CN'}
							</Avatar>
						</Link>

						<Box>
							<Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
								<Link
									to={`/profile/${user?._id}`}
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									{user?.username}
								</Link>
							</Typography>
							<Typography
								sx={{
									color: 'grey.600',
									fontSize: '0.875rem',
								}}
							>
								{user?.bio || 'Bio here...'}
							</Typography>
						</Box>
					</Box>

					<Typography
						sx={{
							color: '#3BADF8',
							fontSize: '0.75rem',
							fontWeight: 700,
							cursor: 'pointer',
							'&:hover': { color: '#3495d6' },
						}}
					>
						Follow
					</Typography>
				</Box>
			))}
		</Box>
	);
};

export default SuggestedUsers;
