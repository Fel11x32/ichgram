import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Feed from './Feed';
import { useGetAllPost } from '../hooks/useGetAllPost';

const Home = () => {
	useGetAllPost()
	return (
		<Box sx={{ display: 'flex' }}>
			<Box sx={{ flexGrow: 1 }}>
				<Feed />
				<Outlet />
			</Box>
		</Box>
	);
};

export default Home;
