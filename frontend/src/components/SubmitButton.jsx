import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({ loading, children }) => (
	<Button
		type='submit'
		variant='contained'
		fullWidth
		disabled={loading}
		sx={{ height: 40, borderRadius: '0.375rem', textTransform: 'none' }}
		startIcon={loading ? <CircularProgress size={16} /> : null}
	>
		{children}
	</Button>
);

export default SubmitButton;
