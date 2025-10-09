import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Feed from './Feed';
import { useGetAllPost } from '../hooks/useGetAllPost';
import RightSidebar from './RightSidebar';
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers';

const Home = () => {
	useGetAllPost();
	useGetSuggestedUsers();
	return (
		<Box sx={{ display: 'flex' }}>
			<Box sx={{ flexGrow: 1 }}>
				<Feed />
				<Outlet />
			</Box>
			<RightSidebar />
		</Box>
	);
};

export default Home;
