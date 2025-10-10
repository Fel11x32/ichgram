import React from 'react';
import {
	Box,
	Avatar,
	Button,
	Typography,
	Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetRTM from '../hooks/useGetRTM';
import useGetAllMessage from '../hooks/useGetAllMessage';

const Messages = ({ selectedUser }) => {
	useGetRTM();
	useGetAllMessage();
	const { messages } = useSelector(store => store.chat);
	const { user } = useSelector(store => store.auth);

	return (
		<Box
			sx={{
				flex: 1,
				overflowY: 'auto',
				p: 2,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					mb: 3,
				}}
			>
				<Avatar
					src={selectedUser?.profilePicture}
					alt='profile'
					sx={{ width: 80, height: 80, mb: 1 }}
				>
					CN
				</Avatar>

				<Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
					{selectedUser?.username}
				</Typography>

				<MuiLink
					component={Link}
					to={`/profile/${selectedUser?._id}`}
					underline='none'
					sx={{ mt: 1.5 }}
				>
					<Button
						variant='outlined'
						size='small'
						sx={{ textTransform: 'none', height: 32 }}
					>
						View profile
					</Button>
				</MuiLink>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
				{messages?.map(msg => {
					const myId = String(user?._id || '');
					const fromId = String(
						(msg?.senderId && (msg.senderId._id || msg.senderId)) ??
							(msg?.sender && (msg.sender._id || msg.sender)) ??
							''
					);
					const isMine = myId && fromId && myId === fromId;

					return (
						<Box
							key={msg._id}
							sx={{
								display: 'flex',
								justifyContent: isMine ? 'flex-end' : 'flex-start',
							}}
						>
							<Box
								sx={{
									p: 1.2,
									borderRadius: 2,
									maxWidth: '70%',
									wordBreak: 'break-word',
									bgcolor: isMine ? 'primary.main' : 'grey.200',
									color: isMine ? 'common.white' : 'text.primary',
								}}
							>
								{msg.message}
							</Box>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default Messages;
