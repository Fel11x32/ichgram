import { Box } from '@mui/material';
import LabeledTextField from './LabeledTextField';

const FieldsGroup = ({ email, username, password, onChange }) => (
	<Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
		<LabeledTextField
			name='email'
			type='email'
			placeholder='Email'
			value={email}
			onChange={onChange}
		/>
		<LabeledTextField
			name='username'
			type='text'
			placeholder='Name'
			value={username}
			onChange={onChange}
		/>
		<LabeledTextField
			name='password'
			type='password'
			placeholder='Password'
			value={password}
			onChange={onChange}
		/>
	</Box>
);

export default FieldsGroup;
