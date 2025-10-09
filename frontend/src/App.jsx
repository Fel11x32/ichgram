import { SnackbarProvider } from 'notistack';
import Signup from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoutes from './components/ProtectedRoutes';
import EditProfile from './components/EditProfile';
import ChatPage from './components/ChatPage'

function App() {
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
