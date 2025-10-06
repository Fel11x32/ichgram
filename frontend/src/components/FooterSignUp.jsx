import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const FooterSignUp = () => (
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
		<Typography sx={{ textAlign: 'center', mr: '6px' }}>
			Don’t have an account?
			<Link to='/signup'>Sign up</Link>
		</Typography>
	</Box>
);

export default FooterSignUp;
