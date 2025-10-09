import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Box,
	Avatar,
	Typography,
	Button,
	Stack,
	Divider,
	Paper,
} from '@mui/material';

const Messages = ({ selectedUser }) => {
	const { messages = [] } = useSelector(s => s.chat || {});
	const { user } = useSelector(s => s.auth || {});

	return (
		<Box sx={{ overflowY: 'auto', flex: 1, p: 2 }}>
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
				<Stack alignItems='center' spacing={1}>
					<Avatar
						src={selectedUser?.profilePicture}
						alt='profile'
						sx={{ width: 80, height: 80 }}
					>
						{selectedUser?.username?.slice(0, 2)?.toUpperCase() || 'CN'}
					</Avatar>
					<Typography>{selectedUser?.username}</Typography>
					<Button
						variant='outlined'
						size='small'
						component={Link}
						to={`/profile/${selectedUser?._id}`}
						sx={{ height: 32, textTransform: 'none' }}
					>
						View profile
					</Button>
				</Stack>
			</Box>

			<Divider sx={{ mb: 2 }} />

			<Stack spacing={1.25}>
				{messages.map(msg => {
					const mine = String(msg.senderId) === String(user?._id);
					return (
						<Box
							key={msg._id}
							sx={{
								display: 'flex',
								justifyContent: mine ? 'flex-end' : 'flex-start',
							}}
						>
							<Paper
								elevation={0}
								sx={{
									px: 1.5,
									py: 1,
									maxWidth: 420,
									borderRadius: 2,
									wordBreak: 'break-word',
									bgcolor: mine ? 'primary.main' : 'grey.200',
									color: mine ? '#fff' : 'text.primary',
								}}
							>
								<Typography variant='body2'>{msg.message}</Typography>
							</Paper>
						</Box>
					);
				})}
			</Stack>
		</Box>
	);
};

export default Messages;
