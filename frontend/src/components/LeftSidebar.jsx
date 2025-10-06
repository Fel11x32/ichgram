import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import Logo from '../assets/ichgram-logo.png';
import {
	Heart,
	Home,
	LogOut,
	MessageCircle,
	PlusSquare,
	Search,
	TrendingUp,
} from 'lucide-react';
import { useToast } from '../hooks/useToast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const sidebarItems = [
	{ icon: <Home />, text: 'Home' },
	{ icon: <Search />, text: 'Search' },
	{ icon: <TrendingUp />, text: 'Explore' },
	{ icon: <MessageCircle />, text: 'Messages' },
	{ icon: <Heart />, text: 'Notifications' },
	{ icon: <PlusSquare />, text: 'Create' },
	{
		icon: (
			<Avatar
				src='https://github.com/shadcn.png'
				alt={'profile'}
				sx={{ width: 24, height: 24, fontSize: 12 }}
			>
				CN
			</Avatar>
		),
		text: 'Profile',
	},
	{ icon: <LogOut />, text: 'Logout' },
];

const LeftSidebar = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const logoutHandler = async () => {
		try {
			const res = await axios.post('http://localhost:8000/api/v1/user/logout', {
				withCredentials: true,
			});
			if (res.data.success) {
				navigate('/login');
				toast.success(res.data.message);
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const sidebarHandler = textType => {
		const actions = {
			Logout: logoutHandler,
			// Create: () => setOpen(true),
			// Profile: () => navigate(`/profile/${user?._id}`),
			Home: () => navigate('/'),
			Messages: () => navigate('/chat'),
		};

		const action = actions[textType];
		if (action) action();
	};


	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 10,
				px: 2,
				borderRight: '1px solid',
				borderColor: 'grey.300',
				width: 'auto',
				height: '100vh',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					component='img'
					src={Logo}
					alt='Logo'
					sx={{ width: '97px', mt: '28px' }}
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '17px',

						mt: '22px',
					}}
				>
					{sidebarItems.map(item => (
						<Box
							onClick={() => sidebarHandler(item.text)}
							key={item.text}
							sx={{
								display: 'flex',
								alignItems: 'center',
								p: '8px 12px',
								borderRadius: '8px',
								cursor: 'pointer',
								transition: 'background-color 0.2s ease',
								'&:hover': {
									backgroundColor: 'grey.100',
								},
							}}
						>
							{item.icon}
							<Typography sx={{ fontSize: 20, ml: '10px' }}>
								{item.text}
							</Typography>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default LeftSidebar;
