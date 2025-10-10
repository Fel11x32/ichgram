import React, { useEffect, useState } from 'react';
import {
	Box,
	Avatar,
	Typography,
	Divider,
	TextField,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Stack,
	Paper,
} from '@mui/material';
import { MessageCircleCode } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/authSlice';
import Messages from './Messages';
import { api } from '../helpers/api';
import { setMessages } from '../redux/chatSlice';

const ChatPage = () => {
	const [textMessage, setTextMessage] = useState('');
	const { suggestedUsers, selectedUser } = useSelector(
		store => store.auth
	);
	const { onlineUsers, messages } = useSelector(store => store.chat);
	const dispatch = useDispatch();

	const sendMessageHandler = async receiverId => {
		try {
			const { data } = await api.post(`/message/send/${receiverId}`, {
				textMessage,
			});
			if (data?.success) {
				dispatch(setMessages([...messages, data.newMessage]));
				setTextMessage('');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		return () => {
			dispatch(setSelectedUser(null));
		};
	}, [dispatch]);

	return (
		<Box
			sx={{
				display: 'flex',
				ml: { md: '16%' },
				height: '100vh',
				overflowY: 'hidden',
			}}
		>
			<Box
				component='section'
				sx={{
					width: { xs: '100%', md: '25%' },
					my: 2,
					pr: { md: 2 },
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Typography
					sx={{ fontWeight: 700, mb: 1, px: 1.5, fontSize: '1.25rem' }}
				>
					username
				</Typography>
				<Divider sx={{ mb: 1 }} />

				<Box sx={{ overflowY: 'auto', height: '80vh' }}>
					<List disablePadding>
						{suggestedUsers.map((suggestedUser, i) => {
							const isOnline = onlineUsers.includes(suggestedUser?._id);
							return (
								<ListItem
									onClick={() => dispatch(setSelectedUser(suggestedUser))}
									key={i}
									sx={{
										gap: 1.5,
										py: 1,
										px: 1.5,
										cursor: 'pointer',
										'&:hover': { backgroundColor: 'grey.50' },
									}}
								>
									<ListItemAvatar>
										<Avatar
											src={suggestedUser?.profilePicture}
											sx={{ width: 56, height: 56, fontSize: 12 }}
										>
											CN
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
												{suggestedUser?.username}
											</Typography>
										}
										secondary={
											<Typography
												sx={{
													fontSize: '0.75rem',
													fontWeight: 700,
													color: isOnline ? 'success.main' : 'error.main',
												}}
											>
												{isOnline ? 'online' : 'offline'}
											</Typography>
										}
									/>
								</ListItem>
							);
						})}
					</List>
				</Box>
			</Box>

			{selectedUser ? (
				<Box
					sx={{
						flex: 1,
						borderLeft: { md: '1px solid' },
						borderColor: { md: 'divider' },
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
					}}
				>
					<Paper
						elevation={0}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1.5,
							px: 1.5,
							py: 1,
							borderBottom: '1px solid',
							borderColor: 'divider',
							position: 'sticky',
							top: 0,
							zIndex: 10,
						}}
					>
						<Avatar
							src={selectedUser?.profilePicture}
							sx={{ width: 40, height: 40 }}
						>
							CN
						</Avatar>
						<Stack spacing={0} sx={{ minWidth: 0 }}>
							<Typography noWrap>{selectedUser?.username}</Typography>
						</Stack>
					</Paper>

					<Messages selectedUser={selectedUser} />

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							p: 2,
							borderTop: '1px solid',
							borderColor: 'divider',
						}}
					>
						<TextField
							value={textMessage}
							onChange={event => setTextMessage(event.target.value)}
							fullWidth
							placeholder='Messages...'
							variant='outlined'
							size='medium'
							sx={{
								'& .MuiOutlinedInput-root': {
									'& fieldset': { borderColor: 'divider' },
									'&:hover fieldset': { borderColor: 'text.secondary' },
									'&.Mui-focused fieldset': { borderColor: 'primary.main' },
								},
							}}
						/>
						<Button
							onClick={() => sendMessageHandler(selectedUser?._id)}
							variant='contained'
							sx={{ textTransform: 'none', boxShadow: 'none' }}
						>
							Send
						</Button>
					</Box>
				</Box>
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						mx: 'auto',
					}}
				>
					<MessageCircleCode
						style={{ width: 128, height: 128, margin: '1rem 0' }}
					/>
					<Typography sx={{ fontWeight: 500 }}>Your messages</Typography>
					<Typography>Send a message to start a chat.</Typography>
				</Box>
			)}
		</Box>
	);
};

export default ChatPage;
