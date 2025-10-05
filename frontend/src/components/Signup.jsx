import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

import { useToast } from '../hooks/useToast';
import Panel from './Panel';
import LogoHeader from './LogoHeader';
import FieldsGroup from './FieldsGroup';
import TermsNotice from './TermsNotice';
import SubmitButton from './SubmitButton';
import LoginFooter from './LoginFooter';

const fullscreenCenterSx = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100vw',
	height: '100vh',
};

const columnStackSx = {
	display: 'flex',
	flexDirection: 'column',
	gap: '15px',
	alignItems: 'stretch',
	mt: '80px',
	maxWidth: '350px',
};

const Signup = () => {
	const [input, setInput] = useState({ email: '', username: '', password: '' });
	const [loading, setLoading] = useState(false);
	const { email, username, password } = input;

	const toast = useToast();

	const handleChange = ({ target: { name, value } }) =>
		setInput(prev => ({ ...prev, [name]: value }));

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(
				'http://localhost:8000/api/v1/user/register',
				input,
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			if (data?.success) {
				toast.success(data.message);
				setInput({ email: '', username: '', password: '' });
			}
		} catch (err) {
			toast.error(err?.response?.data?.message || 'Request failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={fullscreenCenterSx}>
			<Box sx={columnStackSx}>
				<Panel component='form' onSubmit={handleSubmit}>
					<LogoHeader text='Sign up to see photos and videos from your friends.' />
					<FieldsGroup
						email={email}
						username={username}
						password={password}
						onChange={handleChange}
					/>
					<TermsNotice />
					<SubmitButton loading={loading}>Signup</SubmitButton>
				</Panel>

				<LoginFooter />
			</Box>
		</Box>
	);
};

export default Signup;
