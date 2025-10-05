import { Paper } from '@mui/material';

const Panel = ({ component = 'div', ...props }) => (
	<Paper
		component={component}
		elevation={0}
		sx={{
			display: 'flex',
			flexDirection: 'column',
			border: '2px solid',
			borderColor: 'grey.300',
			gap: 2.5,
			p: 4,
		}}
		{...props}
	/>
);

export default Panel;
