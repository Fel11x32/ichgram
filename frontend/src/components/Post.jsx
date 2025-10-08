import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	InputBase,
	Typography,
} from '@mui/material';
import { Bookmark, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import CommentDialog from './CommentDialog';

const Post = () => {
	const [open, setOpen] = useState(false);
	const [openComment, setOpenComment] = useState(false);
	const [text, setText] = useState('');

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const changeEventHandler = event => {
		setText(event.target.value);
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Avatar
						src={undefined}
						alt='profile_post_image'
						sx={{ width: 27, height: 27, fontSize: 12 }}
					>
						CN
					</Avatar>
					<Typography fontWeight={500}>username</Typography>
				</Box>
				<div>
					<IconButton onClick={handleOpen}>
						<MoreHorizontal />
					</IconButton>

					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>More Options</DialogTitle>
						<DialogContent>
							<Button
								variant='text'
								sx={{
									cursor: 'pointer',
									width: 'fit-content',
									color: '#ED4956',
									fontWeight: 'bold',
									textTransform: 'none',
								}}
							>
								Unfollow
							</Button>
							<Button
								variant='text'
								sx={{
									cursor: 'pointer',
									width: 'fit-content',
									textTransform: 'none',
								}}
							>
								Add to favorites
							</Button>
							<Button
								variant='text'
								sx={{
									cursor: 'pointer',
									width: 'fit-content',
									textTransform: 'none',
								}}
							>
								Delete
							</Button>
						</DialogContent>
					</Dialog>
				</div>
			</Box>
			<Box
				component='img'
				src='https://cdn.pixabay.com/photo/2023/10/30/10/16/tram-8352473_1280.jpg'
				alt='post image'
				sx={{
					borderRadius: '4px',
					my: 1,
					width: '100%',
					maxWidth: '400px',
					height: '500px',
					aspectRatio: '1 / 1',
					objectFit: 'cover',
					display: 'block',
				}}
			/>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						mt: 1,
					}}
				>
					<IconButton size='small'>
						<Heart />
					</IconButton>
					<IconButton size='small'>
						<MessageCircle onClick={() => setOpenComment(true)} />
					</IconButton>
				</Box>
				<IconButton size='small'>
					<Bookmark />
				</IconButton>
			</Box>

			<Box sx={{ mt: 1 }}>
				<Typography
					variant='body2'
					sx={{
						fontWeight: 500,
						display: 'block',
						mb: 0.5,
					}}
				>
					2 likes
				</Typography>

				<Typography
					variant='body2'
					sx={{
						lineHeight: 1.4,
						display: 'flex',
						flexDirection: 'column',
						gap: '16px',
					}}
				>
					<Box component='span' sx={{ fontWeight: 500, mr: 1 }}>
						username
					</Box>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
					mollitia!
				</Typography>
			</Box>

			<Typography
				variant='body2'
				sx={{
					cursor: 'pointer',
					fontSize: '0.875rem',
					color: 'grey.500',
				}}
				onClick={() => setOpenComment(true)}
			>
				View all 10 comments
			</Typography>

			<CommentDialog
				openComment={openComment}
				setOpenComment={setOpenComment}
			/>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					mt: 1,
				}}
			>
				<InputBase
					value={text}
					onChange={changeEventHandler}
					type='text'
					placeholder='Add a comment...'
					sx={{
						flex: 1,
						fontSize: '0.875rem',
						outline: 'none',
					}}
				/>
				{text && (
					<Typography
						sx={{
							color: '#3BADF8',
							cursor: 'pointer',
							fontWeight: 500,
							ml: 1,
						}}
					>
						Post
					</Typography>
				)}
			</Box>
		</>
	);
};

export default Post;
