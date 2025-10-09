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
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../hooks/useToast';
import axios from 'axios';
import { setPosts } from '../redux/postSlice';

const Post = ({ post }) => {
	const [open, setOpen] = useState(false);
	const [openComment, setOpenComment] = useState(false);
	const [text, setText] = useState('');
	const toast = useToast();
	const { user } = useSelector(store => store.auth);
	const { posts } = useSelector(store => store.post);
	const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
	const [postLike, setPostLike] = useState(post.likes.length);
	const dispatch = useDispatch();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const changeEventHandler = event => {
		setText(event.target.value);
	};

	const likeOrDislikeHandler = async () => {
		try {
			const { data } = await axios.post(
				`http://localhost:8000/api/v1/post/${post._id}/like`,
				null,
				{ withCredentials: true }
			);
			if (!data?.success) return;

			const nextLiked = !liked;

			setLiked(nextLiked);
			setPostLike(c => c + (nextLiked ? 1 : -1));

			dispatch(
				setPosts(
					posts.map(p =>
						p._id === post._id
							? {
									...p,
									likes: nextLiked
										? [...p.likes, user._id]
										: p.likes.filter(id => id !== user._id),
							  }
							: p
					)
				)
			);
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data?.message);
		}
	};

	const deletePostHandler = async () => {
		try {
			const { data } = await axios.delete(
				`http://localhost:8000/api/v1/post/delete/${post._id}`,
				{ withCredentials: true }
			);
			if (data?.success) {
				const updatedPostData = posts.filter(
					postItem => postItem?._id !== post?._id
				);
				dispatch(setPosts(updatedPostData));
				handleClose();
				toast.success(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 1,
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Avatar
						src={post.author.profilePicture}
						alt='profile_post_image'
						sx={{ width: 27, height: 27, fontSize: 12 }}
					>
						CN
					</Avatar>
					<Typography fontWeight={500}>{post.author.username}</Typography>
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
							{user && user?._id === post?.author._id && (
								<Button
									onClick={deletePostHandler}
									variant='text'
									sx={{
										cursor: 'pointer',
										width: 'fit-content',
										textTransform: 'none',
									}}
								>
									Delete
								</Button>
							)}
						</DialogContent>
					</Dialog>
				</div>
			</Box>
			<Box
				component='img'
				src={post.image}
				alt='post image'
				sx={{
					borderRadius: '4px',
					my: 1,
					width: '400px',
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
					<IconButton onClick={likeOrDislikeHandler} size='small'>
						{liked ? <Heart fill='red' color='red' /> : <Heart />}
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
					{postLike} likes
				</Typography>

				{post.caption && (
					<Typography
						variant='body2'
						sx={{
							lineHeight: 1.4,
							display: 'flex',
						}}
					>
						<Box component='span' sx={{ fontWeight: 500, mr: 1 }}>
							{post.author.username}
						</Box>
						{post.caption}
					</Typography>
				)}
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
				View all {post.comments.length} comments
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
