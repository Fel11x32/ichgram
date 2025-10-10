import React, { useState } from 'react';
import Logo from '../assets/ichgram-logo.png';
import {
	Box,
	Divider,
	Typography,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Avatar,
	IconButton,
	Popover,
	Badge,
	Button as MUIButton,
	Stack,
} from '@mui/material';
import {
	Heart,
	Home,
	LogOut,
	MessageCircle,
	PlusSquare,
	Search,
	TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '../redux/postSlice';
import { useToast } from '../hooks/useToast';
import LogoHeader from './LogoHeader';
import { api } from '../helpers/api';
import { clearNotifications } from '../redux/rtnSlice';

const LeftSidebar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const toast = useToast();

	const { user } = useSelector(store => store.auth);
	const { likeNotification = [] } = useSelector(
		store => store.realTimeNotification
	);

	const [openCreate, setOpenCreate] = useState(false);
	const [notifAnchor, setNotifAnchor] = useState(null);

	const logoutHandler = async () => {
		try {
			const { data } = await api.post('user/logout');
			if (data?.success) {
				dispatch(setAuthUser(null));
				dispatch(setSelectedPost(null));
				dispatch(setPosts([]));
				navigate('/login');
				toast.success(data?.message);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Logout failed');
		}
	};

	const sidebarHandler = textType => {
		if (textType === 'Logout') {
			logoutHandler();
		} else if (textType === 'Create') {
			setOpenCreate(true);
		} else if (textType === 'Profile') {
			navigate(`/profile/${user?._id}`);
		} else if (textType === 'Home') {
			navigate('/');
		} else if (textType === 'Messages') {
			navigate('/chat');
		}
	};

	const sidebarItems = [
		{ icon: <Home width='24px' />, text: 'Home' },
		{ icon: <Search />, text: 'Search' },
		{ icon: <TrendingUp />, text: 'Explore' },
		{ icon: <MessageCircle />, text: 'Messages' },
		{ icon: <Heart />, text: 'Notifications' },
		{ icon: <PlusSquare />, text: 'Create' },
		{
			icon: (
				<Avatar src={user?.profilePicture} className='w-6 h-6'>
					CN
				</Avatar>
			),
			text: 'Profile',
		},
		{ icon: <LogOut />, text: 'Logout' },
	];

	const handleNotifClick = event => {
		setNotifAnchor(event.currentTarget);
	};
	const handleNotifClose = () => {
		dispatch(clearNotifications());
		setNotifAnchor(null);
	};

	const notifOpen = Boolean(notifAnchor);

	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 10,
				borderRight: '1px solid',
				borderColor: 'divider',
				pl: 2,
				pr: 6,
				height: '100vh',
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
			<Divider />

			<List sx={{ mt: 1 }}>
				{sidebarItems.map((item, idx) => {
					const isNotifications = item.text === 'Notifications';
					return (
						<ListItemButton
							key={idx}
							onClick={e => {
								if (isNotifications) {
									handleNotifClick(e);
								} else {
									sidebarHandler(item.text);
								}
							}}
							sx={{
								my: 0.75,
								px: 1.5,
								'&:hover': { backgroundColor: 'grey.100' },
							}}
						>
							<ListItemIcon>
								{isNotifications ? (
									<Badge
										color='error'
										badgeContent={likeNotification.length || 0}
										overlap='circular'
									>
										{item.icon}
									</Badge>
								) : (
									item.icon
								)}
							</ListItemIcon>
							<ListItemText
								primary={item.text}
								primaryTypographyProps={{ fontSize: 14 }}
								sx={{ display: { xs: 'none', md: 'block' } }}
							/>
						</ListItemButton>
					);
				})}
			</List>

			<Popover
				open={notifOpen}
				anchorEl={notifAnchor}
				onClose={handleNotifClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				PaperProps={{ sx: { p: 1, width: 280 } }}
			>
				<Box>
					{likeNotification.length === 0 ? (
						<Typography sx={{ px: 1, py: 0.5, fontSize: 14 }}>
							No new notification
						</Typography>
					) : (
						<Stack spacing={1}>
							{likeNotification.map(notification => (
								<Stack
									key={notification.userId}
									direction='row'
									alignItems='center'
									spacing={1.25}
								>
									<Avatar sx={{ width: 36, height: 36 }}>
										{notification.userDetails?.profilePicture ? (
											<img
												src={notification.userDetails.profilePicture}
												alt='u'
												style={{
													width: '100%',
													height: '100%',
													objectFit: 'cover',
												}}
											/>
										) : (
											(notification.userDetails?.username || 'CN')
												.slice(0, 2)
												.toUpperCase()
										)}
									</Avatar>
									<Typography sx={{ fontSize: 14 }}>
										<b>{notification.userDetails?.username}</b> liked your post
									</Typography>
								</Stack>
							))}
						</Stack>
					)}
					<MUIButton
						onClick={handleNotifClose}
						fullWidth
						size='small'
						sx={{ mt: 1, textTransform: 'none' }}
					>
						Close
					</MUIButton>
				</Box>
			</Popover>

			<CreatePost open={openCreate} setOpen={setOpenCreate} />
		</Box>
	);
};

export default LeftSidebar;
