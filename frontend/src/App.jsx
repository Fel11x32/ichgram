import { SnackbarProvider } from 'notistack';
import Signup from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoutes from './components/ProtectedRoutes';
import EditProfile from './components/EditProfile';
import ChatPage from './components/ChatPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setConnected } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { connectSocket, disconnectSocket } from './helpers/socket.js';
import { setLikeNotification } from './redux/rtnSlice.js';

const browserRouter = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoutes>
				<MainLayout />
			</ProtectedRoutes>
		),
		children: [
			{
				path: '/',
				element: (
					<ProtectedRoutes>
						<Home />
					</ProtectedRoutes>
				),
			},
			{
				path: '/profile/:id',
				element: (
					<ProtectedRoutes>
						{' '}
						<Profile />
					</ProtectedRoutes>
				),
			},
			{
				path: '/account/edit',
				element: (
					<ProtectedRoutes>
						<EditProfile />
					</ProtectedRoutes>
				),
			},
			{
				path: '/chat',
				element: (
					<ProtectedRoutes>
						<ChatPage />
					</ProtectedRoutes>
				),
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
]);

function App() {
	const { user } = useSelector(store => store.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user?._id) {
			disconnectSocket();
			dispatch(setConnected({ isConnected: false, socketId: null }));
			return;
		}

		const socket = connectSocket(user._id);

		const onConnect = () =>
			dispatch(setConnected({ isConnected: true, socketId: socket.id }));
		const onDisconnect = () =>
			dispatch(setConnected({ isConnected: false, socketId: null }));
		const onOnlineUsers = onlineUsers => dispatch(setOnlineUsers(onlineUsers));
		const onNotification = notification =>
			dispatch(setLikeNotification(notification));
		const onError = err =>
			console.warn('socket connect_error:', err?.message || err);

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('getOnlineUsers', onOnlineUsers);
		socket.on('notification', onNotification);
		socket.on('connect_error', onError);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('getOnlineUsers', onOnlineUsers);
			socket.off('notification', onNotification);
			socket.off('connect_error', onError);
		};
	}, [user?._id, dispatch]);

	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			autoHideDuration={3000}
		>
			<RouterProvider router={browserRouter}></RouterProvider>
		</SnackbarProvider>
	);
}

export default App;
