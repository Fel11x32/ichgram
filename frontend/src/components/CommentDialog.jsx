import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../hooks/useToast';
import { setPosts } from '../redux/postSlice';
import Comment from './Comment';
import { api } from '../helpers/api';

const PostDialog = ({ openComment, setOpenComment }) => {
	const [optionsOpen, setOptionsOpen] = useState(false);
	const [text, setText] = useState('');
	const { selectedPost, posts } = useSelector(store => store.post);
	const [comment, setComment] = useState(selectedPost?.comments);	

	const dispatch = useDispatch();
	const toast = useToast();

	const handleClose = () => setOpenComment(false);

	useEffect(() => {
		if (selectedPost) {
			setComment(selectedPost.comments);
		}
	}, [selectedPost]);

	const changeEventHandler = e => {
		const inputText = e.target.value;
		if (inputText.trim()) {
			setText(inputText);
		} else {
			setText('');
		}
	};

	const sendMessageHandler = async () => {
		try {
			const { data } = await api.post(`/post/${selectedPost?._id}/comment`, {
				text,
			});
			if (data?.success) {
				const updatedCommentData = [...comment, data.comment];
				setComment(updatedCommentData);

				const updatedPostData = posts.map(p =>
					p._id === selectedPost._id
						? { ...p, comments: updatedCommentData }
						: p
				);
				dispatch(setPosts(updatedPostData));
				toast.success(data.message);
				setText('');
			}
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message || 'Failed');
		}
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
							src={selectedPost?.image}
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
									<Avatar
										src={selectedPost?.author?.profilePicture}
										alt='profile_photo'
									>
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
										{selectedPost?.author?.username}
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
							<Box
								sx={{
									flex: 1,
									overflowY: 'auto',
									maxHeight: 384,
								}}
							>
								{comment?.map(c => (
									<Comment key={c._id} comment={c} />
								))}
							</Box>
						</Box>

						<Box sx={{ p: 2 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<TextField
									fullWidth
									size='small'
									placeholder='Add a comment...'
									value={text}
									onChange={changeEventHandler}
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
									onClick={sendMessageHandler}
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
