import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';

const MainLayout = () => {
	return (
		<Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
			<LeftSidebar />
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					overflowY: 'auto',
					bgcolor: 'background.default',
					p: 3,
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default MainLayout;
