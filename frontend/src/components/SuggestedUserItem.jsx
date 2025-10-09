import React from 'react';
import { useFollow } from '../hooks/useFollow';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Typography } from '@mui/material';


const SuggestedUserItem = ({ item }) => {
	const { isFollowing, toggleFollow, loading } = useFollow(item._id);

	return (
		<Box
			key={item._id}
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
					to={`/profile/${item?._id}`}
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<Avatar
						src={item?.profilePicture}
						alt='post_image'
						sx={{ width: 40, height: 40, fontSize: 12 }}
					>
						{item?.username ? item.username.slice(0, 2).toUpperCase() : 'CN'}
					</Avatar>
				</Link>
				<Box>
					<Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
						<Link
							to={`/profile/${item?._id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							{item?.username}
						</Link>
					</Typography>
					<Typography sx={{ color: 'grey.600', fontSize: '0.875rem' }}>
						{item?.bio || 'Bio here...'}
					</Typography>
				</Box>
			</Box>

			<Button
				onClick={toggleFollow}
				disabled={loading}
				variant={isFollowing ? 'outlined' : 'contained'}
				size='small'
				sx={{
					textTransform: 'none',
					fontWeight: 700,
					fontSize: '0.75rem',
					width: '80px',
					height: 28,
					...(isFollowing
						? {
							borderColor: 'red',
							color: 'red'
						}
						: {
								backgroundColor: '#0095F6',
								'&:hover': { backgroundColor: '#3192d2' },
								boxShadow: 'none',
						  }),
				}}
			>
				{loading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
			</Button>
		</Box>
	);
};

export default SuggestedUserItem;
