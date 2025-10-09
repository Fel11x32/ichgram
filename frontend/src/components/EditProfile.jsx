import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Avatar as MAvatar,
	Button as MButton,
	Typography,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Chip,
	CircularProgress,
} from '@mui/material';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { setAuthUser } from '../redux/authSlice';
import { api } from '../helpers/api';

const EditProfile = () => {
	const imageRef = useRef(null);
	const { user } = useSelector(store => store.auth);
	const toast = useToast();
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState({
		profilePhoto: user?.profilePicture || null,
		bio: user?.bio || '',
		gender: user?.gender || '',
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const fileChangeHandler = e => {
		const file = e.target.files?.[0];
		if (file) setInput(prev => ({ ...prev, profilePhoto: file }));
	};

	const selectChangeHandler = e => {
		setInput(prev => ({ ...prev, gender: e.target.value }));
	};

	const editProfileHandler = async () => {
		const formData = new FormData();
		formData.append('bio', input.bio || '');
		formData.append('gender', input.gender || '');
		if (input.profilePhoto && input.profilePhoto instanceof File) {
			formData.append('profilePhoto', input.profilePhoto);
		}

		try {
			setLoading(true);
			const { data } = await api.patch('/user/profile', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			if (data?.success) {
				const updatedUserData = {
					...user,
					bio: data.user?.bio,
					profilePicture: data.user?.profilePicture,
					gender: data.user?.gender,
				};
				dispatch(setAuthUser(updatedUserData));
				navigate(`/profile/${user?._id}`);
				toast.success(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.messasge || 'Update failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				maxWidth: '42rem', // max-w-2xl
				mx: 'auto',
				pl: '2.5rem', // pl-10
			}}
		>
			<Box
				component='section'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1.5rem', // gap-6
					width: '100%',
					my: '2rem', // my-8
				}}
			>
				<Typography variant='h5' sx={{ fontWeight: 700 }}>
					Edit Profile
				</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						backgroundColor: 'grey.100',
						borderRadius: '0.75rem', // rounded-xl
						p: '1rem', // p-4
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
						<MAvatar
							src={
								input.profilePhoto instanceof File
									? URL.createObjectURL(input.profilePhoto)
									: user?.profilePicture
							}
							alt='post_image'
							sx={{ width: 40, height: 40 }}
						/>
						<Box>
							<Typography sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
								{user?.username}
							</Typography>
							<Typography sx={{ color: 'text.secondary' }}>
								{user?.bio || 'Bio here...'}
							</Typography>
						</Box>
					</Box>

					<input
						ref={imageRef}
						onChange={fileChangeHandler}
						type='file'
						accept='image/*'
						style={{ display: 'none' }}
					/>
					<MButton
						variant='contained'
						onClick={() => imageRef?.current?.click()}
						sx={{
							height: '2rem', // h-8
							backgroundColor: '#0095F6',
							'&:hover': { backgroundColor: '#318bc7' },
							textTransform: 'none',
							boxShadow: 'none',
						}}
					>
						Change photo
					</MButton>
				</Box>

				<Box>
					<Typography variant='h6' sx={{ fontWeight: 700, mb: '0.5rem' }}>
						Bio
					</Typography>
					<TextField
						value={input.bio}
						onChange={e => setInput(p => ({ ...p, bio: e.target.value }))}
						name='bio'
						fullWidth
						multiline
						minRows={3}
						placeholder='Write something about you...'
						variant='outlined'
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': { borderColor: 'divider' },
								'&:hover fieldset': { borderColor: 'text.secondary' },
								'&.Mui-focused fieldset': { borderColor: 'primary.main' },
							},
						}}
					/>
				</Box>

				<Box>
					<Typography sx={{ fontWeight: 700, mb: '0.5rem' }}>Gender</Typography>
					<FormControl fullWidth>
						<InputLabel id='gender-label'>Gender</InputLabel>
						<Select
							labelId='gender-label'
							label='Gender'
							value={input.gender || ''}
							onChange={selectChangeHandler}
						>
							<MenuItem value='male'>Male</MenuItem>
							<MenuItem value='female'>Female</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box sx={{ display: 'flex', justifyContent: 'end' }}>
					{loading ? (
						<MButton
							disabled
							variant='contained'
							sx={{
								width: 'fit-content',
								backgroundColor: '#0095F6',
								'&:hover': { backgroundColor: '#2a8ccd' },
								textTransform: 'none',
								boxShadow: 'none',
								gap: '0.5rem',
							}}
						>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Please wait
						</MButton>
					) : (
						<MButton
							onClick={editProfileHandler}
							variant='contained'
							sx={{
								width: 'fit-content',
								backgroundColor: '#0095F6',
								'&:hover': { backgroundColor: '#2a8ccd' },
								textTransform: 'none',
								boxShadow: 'none',
							}}
						>
							Submit
						</MButton>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default EditProfile;
