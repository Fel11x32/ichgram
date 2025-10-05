import { Box, Typography, Link } from '@mui/material';

const TermsNotice = () => (
	<Box sx={{ mt: 1.5, mb: 1, maxWidth: 268 }}>
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			sx={{ mb: 1 }}
		>
			People who use our service may have uploaded your contact information to
			Instagram.{' '}
			<Link href='#' underline='none' color='primary'>
				Learn More
			</Link>
		</Typography>
		<Typography variant='body2' color='text.secondary' align='center'>
			By signing up, you agree to our{' '}
			<Link href='#' underline='none' color='primary'>
				Terms
			</Link>
			,{' '}
			<Link href='#' underline='none' color='primary'>
				Privacy Policy
			</Link>{' '}
			and{' '}
			<Link href='#' underline='none' color='primary'>
				Cookies Policy
			</Link>
			.
		</Typography>
	</Box>
);

export default TermsNotice;
