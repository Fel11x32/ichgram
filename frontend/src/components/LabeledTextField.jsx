import { Box, TextField } from '@mui/material';

const LabeledTextField = ({
	name,
	value,
	onChange,
	type = 'text',
	placeholder,
	sx,
	...props
}) => {
	return (
		<Box>
			<TextField
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				size='small'
				fullWidth
				placeholder={placeholder}
				sx={{
					my: 1,
					'& .MuiOutlinedInput-root': { borderRadius: '0.375rem' },
					...sx,
				}}
				{...props}
			/>
		</Box>
	);
};

export default LabeledTextField;
