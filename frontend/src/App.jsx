import { SnackbarProvider } from 'notistack';
import Signup from './components/Signup';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
	const browserRouter = createBrowserRouter([
		{
			path: '/',
			element: <MainLayout />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/profile',
					element: <Profile />,
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
			<RouterProvider router={browserRouter}>

			</RouterProvider>
		</SnackbarProvider>
	);
}

export default App;
