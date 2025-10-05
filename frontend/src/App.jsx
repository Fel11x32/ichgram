import { SnackbarProvider } from 'notistack';
import Signup from './components/Signup';

function App() {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			autoHideDuration={3000}
		>
			<Signup />
		</SnackbarProvider>
	);
}

export default App;
