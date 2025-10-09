import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { readFileAsDataURL } from '../helpers/fileUtils';
import { useToast } from '../hooks/useToast';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/postSlice';
import { api } from '../helpers/api';

const CreatePost = ({ open, setOpen }) => {
	const [file, setFile] = useState('');
	const [caption, setCaption] = useState('');
	const [imagePreview, setImagePreview] = useState('');
	const [loading, setLoading] = useState(false);

	const { user } = useSelector(store => store.auth);
	const { posts } = useSelector(store => store.post);

	const imageRef = useRef();

	const dispatch = useDispatch();

	const toast = useToast();

	const fileChangeHandler = async event => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file);
			const dataUrl = await readFileAsDataURL(file);
			setImagePreview(dataUrl);
		}
	};

	const createPostHandler = async () => {
		const formData = new FormData();
		formData.append('caption', caption);
		if (imagePreview) formData.append('image', file);

		try {
			setLoading(true);
			const { data } = await api.post('/post/addpost', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			if (data?.success) {
				dispatch(setPosts([data?.post, ...posts]));
				toast.success(data?.message);
				setOpen(false);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Create failed');
		} finally {
			setLoading(false);
		}
	};


	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			maxWidth={false}
			PaperProps={{
				sx: {
					width: 900,
					maxWidth: '90vw',
					height: 600,
					borderRadius: 2,
					overflow: 'hidden',
				},
			}}
		>
			<DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
				Create New Post
			</DialogTitle>

			<DialogContent
				sx={{
					display: 'flex',
					flexDirection: 'row',
					p: 0,
					height: '100%',
				}}
			>
				<Box
					onClick={() => imageRef.current.click()}
					sx={{
						width: '60%',
						height: '100%',
						backgroundColor: 'grey.100',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
					}}
				>
					{imagePreview ? (
						<Box
							component='img'
							src={imagePreview}
							alt='preview_img'
							sx={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								borderBottomLeftRadius: 8,
							}}
						/>
					) : (
						<Typography color='text.secondary' fontSize='0.9rem'>
							Image preview will appear here
						</Typography>
					)}
				</Box>

				<Box
					sx={{
						width: '40%',
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						p: 3,
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Avatar src={user.profilePicture} alt='img'>
							CN
						</Avatar>
						<Box>
							<Typography sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
								{user.username}
							</Typography>
							<Typography sx={{ color: 'grey.600', fontSize: '0.8rem' }}>
								{user.bio}
							</Typography>
						</Box>
					</Box>

					<TextField
						value={caption}
						onChange={event => setCaption(event.target.value)}
						multiline
						minRows={3}
						placeholder='Write a caption...'
						fullWidth
						variant='outlined'
						sx={{
							flexGrow: 1,
							'& .MuiOutlinedInput-root': {
								'& fieldset': { border: 'none' },
								fontSize: '0.9rem',
							},
						}}
					/>

					<input
						ref={imageRef}
						type='file'
						accept='image/*'
						style={{ display: 'none' }}
						onChange={fileChangeHandler}
					/>

					<Button
						onClick={createPostHandler}
						type='submit'
						variant='contained'
						fullWidth
						disabled={!imagePreview || loading}
						startIcon={
							loading ? (
								<CircularProgress size={16} sx={{ color: 'white' }} />
							) : null
						}
						sx={{
							height: 40,
							borderRadius: '0.375rem',
							textTransform: 'none',
						}}
					>
						{loading ? 'Please wait' : 'Post'}
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default CreatePost;
