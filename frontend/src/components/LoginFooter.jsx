import { Box, Typography, Link } from '@mui/material';

const LoginFooter = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			border: '2px solid',
			borderColor: 'grey.300',
			gap: 2.5,
			p: 4,
		}}
	>
		<Typography sx={{ textAlign: 'center' }}>
			Have an account?
			<Link sx={{ ml: '6px' }}>Log in</Link>
		</Typography>
	</Box>
);

export default LoginFooter;
