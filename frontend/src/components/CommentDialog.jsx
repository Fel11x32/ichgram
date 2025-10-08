import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';

const PostDialog = ({ openComment, setOpenComment }) => {
	const [optionsOpen, setOptionsOpen] = useState(false);
	const [text, setText] = useState('');

	const handleClose = () => setOpenComment(false);

	const sendMessageHandler = async () => {
		alert(text);
		setText('')
	};

	return (
		<Dialog open={openComment} onClose={handleClose} maxWidth={false}>
			<DialogContent
				sx={{
					p: 0,
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					height: '80vh',
				}}
			>
				<Box
					sx={{ display: 'flex', flex: 1, width: '100%', maxWidth: '1000px' }}
				>
					<Box sx={{ width: '55%' }}>
						<Box
							component='img'
							src='https://cdn.pixabay.com/photo/2023/10/30/10/16/tram-8352473_1280.jpg'
							alt='post_img'
							sx={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								borderTopLeftRadius: 8,
								borderBottomLeftRadius: 8,
								display: 'block',
							}}
						/>
					</Box>

					<Box
						sx={{
							width: '45%',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								p: 2,
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
								<Link style={{ textDecoration: 'none' }} to='#'>
									<Avatar src='' alt='profile_photo'>
										CN
									</Avatar>
								</Link>
								<Box>
									<Typography
										component={Link}
										to='#'
										sx={{
											fontWeight: 600,
											fontSize: '0.75rem',
											textDecoration: 'none',
											color: 'inherit',
										}}
									>
										username
									</Typography>
								</Box>
							</Box>
							<IconButton onClick={() => setOptionsOpen(true)}>
								<MoreHorizontal />
							</IconButton>

							<Dialog open={optionsOpen} onClose={() => setOptionsOpen(false)}>
								<DialogTitle sx={{ textAlign: 'center', fontSize: '0.9rem' }}>
									Options
								</DialogTitle>
								<DialogContent
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										p: 0,
										minWidth: 220,
									}}
								>
									<Button
										variant='text'
										fullWidth
										sx={{
											color: '#ED4956',
											fontWeight: 'bold',
											textTransform: 'none',
											borderBottom: '1px solid #eee',
											borderRadius: 0,
											py: 1.25,
										}}
									>
										Unfollow
									</Button>
									<Button
										variant='text'
										fullWidth
										sx={{ textTransform: 'none', borderRadius: 0, py: 1.25 }}
									>
										Add to favorites
									</Button>
								</DialogContent>
							</Dialog>
						</Box>

						<Divider />

						<Box
							sx={{
								flex: 1,
								overflowY: 'auto,',
								maxHeight: 384,
								maxWidth: 430,
								p: 2,
							}}
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic atque
							quas obcaecati nam corporis eveniet architecto explicabo nostrum
							veniam vitae, iste, soluta voluptas, odio amet nisi minima.
							Ducimus, qui harum!
						</Box>

						<Box sx={{ p: 2 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<TextField
									fullWidth
									size='small'
									placeholder='Add a comment...'
									value={text}
									onChange={e => setText(e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											borderRadius: 1,
											fontSize: '0.875rem',
										},
									}}
								/>
								<Button
									variant='outlined'
									disabled={!text.trim()}
									onClick={() => sendMessageHandler()}
									sx={{ textTransform: 'none' }}
								>
									Send
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default PostDialog;
