import React, { useState } from 'react';
import { Box, Avatar, Typography, Button, Chip } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useFollow } from '../hooks/useFollow';

const Profile = () => {
	const params = useParams();
	const userId = params.id;
	useGetUserProfile(userId);
	const [activeTab, setActiveTab] = useState('posts');

	const { userProfile, user } = useSelector(store => store.auth);

	const isLoggedInUserProfile = user?._id === userProfile?._id;

	const { isFollowing, toggleFollow, loading } = useFollow(userProfile?._id);

	const handleTabChange = tab => {
		setActiveTab(tab);
	};

	const displayedPost =
		activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

	return (
		<Box
			sx={{
				display: 'flex',
				maxWidth: '1024px',
				justifyContent: 'center',
				mx: 'auto',
				pl: '2.5rem',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '5rem',
					p: '2rem',
					width: '100%',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '95px',
					}}
				>
					<Box
						component='section'
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Avatar
							src={userProfile?.profilePicture}
							alt='profilephoto'
							sx={{ width: '8rem', height: '8rem' }} // h-32 w-32
						>
							{userProfile?.username?.[0]?.toUpperCase() || 'CN'}
						</Avatar>
					</Box>

					<Box component='section'>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1.25rem',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
								}}
							>
								<Typography component='span'>
									{userProfile?.username}
								</Typography>

								{isLoggedInUserProfile ? (
									<>
										<Button
											component={Link}
											to='/account/edit'
											variant='outlined'
											size='small'
											sx={{
												height: '2rem',
												px: '0.75rem',
												textTransform: 'none',
												'&:hover': { backgroundColor: 'grey.200' },
											}}
										>
											Edit profile
										</Button>
										<Button
											variant='outlined'
											size='small'
											sx={{
												height: '2rem',
												px: '0.75rem',
												textTransform: 'none',
												'&:hover': { backgroundColor: 'grey.200' },
											}}
										>
											View archive
										</Button>
										<Button
											variant='outlined'
											size='small'
											sx={{
												height: '2rem',
												px: '0.75rem',
												textTransform: 'none',
												'&:hover': { backgroundColor: 'grey.200' },
											}}
										>
											Add tools
										</Button>
									</>
								) : (
									<>
										<Button
											disabled={loading}
											onClick={toggleFollow}
											variant={isFollowing ? 'outlined' : 'contained'}
											size='small'
											sx={{
												height: '2rem',
												px: '0.75rem',
												textTransform: 'none',
												backgroundColor: isFollowing ? undefined : '#0095F6',
												'&:hover': isFollowing
													? {}
													: { backgroundColor: '#3192d2' },
												boxShadow: isFollowing ? undefined : 'none',
											}}
										>
											{loading
												? 'Processing…'
												: isFollowing
												? 'Unfollow'
												: 'Follow'}
										</Button>
										{isFollowing && (
											<Button
												variant='outlined'
												size='small'
												sx={{
													height: '2rem',
													px: '0.75rem',
													textTransform: 'none',
												}}
											>
												Message
											</Button>
										)}
									</>
								)}
							</Box>

							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem',
								}}
							>
								<Typography component='p' sx={{ fontSize: 14 }}>
									<Box component='span' sx={{ fontWeight: 600 }}>
										{userProfile?.posts.length}{' '}
									</Box>
									posts
								</Typography>
								<Typography component='p' sx={{ fontSize: 14 }}>
									<Box component='span' sx={{ fontWeight: 600 }}>
										{userProfile?.followers.length}{' '}
									</Box>
									followers
								</Typography>
								<Typography component='p' sx={{ fontSize: 14 }}>
									<Box component='span' sx={{ fontWeight: 600 }}>
										{userProfile?.following.length}{' '}
									</Box>
									following
								</Typography>
							</Box>

							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.25rem',
								}}
							>
								<Typography component='span' sx={{ fontWeight: 600 }}>
									{userProfile?.bio || 'bio here...'}
								</Typography>

								<Chip
									variant='outlined'
									size='small'
									sx={{
										width: 'fit-content',
										px: '0.25rem',
										'& .MuiChip-label': {
											display: 'flex',
											alignItems: 'center',
											gap: '0.25rem',
											pl: 0.25,
										},
									}}
									label={
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<AtSign size={16} />
											<Box component='span' sx={{ pl: '0.25rem' }}>
												{userProfile?.username}
											</Box>
										</Box>
									}
								/>
							</Box>
						</Box>
					</Box>
				</Box>

				<Box
					sx={{
						borderTop: '1px solid',
						borderColor: 'grey.200',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '2.5rem',
							fontSize: '0.875rem',
						}}
					>
						<Typography
							component='span'
							onClick={() => handleTabChange('posts')}
							sx={{
								py: '0.75rem',
								cursor: 'pointer',
								fontWeight: activeTab === 'posts' ? 700 : 400,
								userSelect: 'none',
							}}
						>
							POSTS
						</Typography>
						<Typography
							component='span'
							onClick={() => handleTabChange('saved')}
							sx={{
								py: '0.75rem',
								cursor: 'pointer',
								fontWeight: activeTab === 'saved' ? 700 : 400,
								userSelect: 'none',
							}}
						>
							SAVED
						</Typography>
						<Typography
							component='span'
							sx={{ py: '0.75rem', cursor: 'pointer', userSelect: 'none' }}
						>
							REELS
						</Typography>
						<Typography
							component='span'
							sx={{ py: '0.75rem', cursor: 'pointer', userSelect: 'none' }}
						>
							TAGS
						</Typography>
					</Box>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
							gap: '0.25rem',
							mt: 1,
						}}
					>
						{displayedPost?.map(post => (
							<Box
								key={post?._id}
								sx={{
									position: 'relative',
									cursor: 'pointer',
									'&:hover .overlay': { opacity: 1 },
								}}
							>
								<Box
									component='img'
									src={post.image}
									alt='postimage'
									sx={{
										borderRadius: '0.125rem',
										my: '0.5rem',
										width: '100%',
										aspectRatio: '1 / 1',
										objectFit: 'cover',
										display: 'block',
									}}
								/>
								<Box
									className='overlay'
									sx={{
										position: 'absolute',
										inset: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: 'rgba(0,0,0,0.5)',
										opacity: 0,
										transition: 'opacity 300ms ease',
									}}
								>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											color: '#fff',
											columnGap: '1rem',
										}}
									>
										<Button
											variant='text'
											sx={{
												color: '#fff',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
												textTransform: 'none',
												minWidth: 0,
												p: 0,
												'&:hover': { color: 'grey.300' },
											}}
										>
											<Heart />
											<Typography component='span'>
												{post?.likes.length}
											</Typography>
										</Button>
										<Button
											variant='text'
											sx={{
												color: '#fff',
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
												textTransform: 'none',
												minWidth: 0,
												p: 0,
												'&:hover': { color: 'grey.300' },
											}}
										>
											<MessageCircle />
											<Typography component='span'>
												{post?.comments.length}
											</Typography>
										</Button>
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Profile;
