import { Box, Typography } from '@mui/material';
import Logo from '../assets/ichgram-logo.png';

const LogoHeader = ({ text }) => (
	<Box sx={{ textAlign: 'center' }}>
		<Box
			component='img'
			src={Logo}
			alt='Logo'
			sx={{ width: 190, height: 'auto' }}
		/>
		<Typography
			variant='body1'
			fontWeight={600}
			color='#737373'
			align='center'
			sx={{ maxWidth: 268 }}
		>
			{text}
		</Typography>
	</Box>
);

export default LogoHeader;
