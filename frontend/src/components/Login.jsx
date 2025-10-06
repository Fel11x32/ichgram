import React, { useState } from 'react';
import axios from 'axios';
import { Box, Link } from '@mui/material';

import { useToast } from '../hooks/useToast';
import Panel from '../components/Panel';
import LogoHeader from '../components/LogoHeader';
import LabeledTextField from '../components/LabeledTextField';
import SubmitButton from '../components/SubmitButton';
import FooterSignUp from '../components/FooterSignUp';
import LoginFooter from './LoginFooter';
import { useNavigate } from 'react-router-dom';

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
	my: '80px',
	maxWidth: '350px',
};

const Login = () => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const { email, password } = input;

	const navigate = useNavigate();

	const toast = useToast();

	const handleChange = ({ target: { name, value } }) =>
		setInput(prev => ({ ...prev, [name]: value }));

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(
				'http://localhost:8000/api/v1/user/login',
				input,
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			if (data?.success) {
				navigate('/')
				toast.success(data.message || 'Logged in');
				setInput({ email: '', password: '' });
			}
		} catch (err) {
			toast.error(err?.response?.data?.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={fullscreenCenterSx}>
			<Box sx={columnStackSx}>
				<Panel component='form' onSubmit={handleSubmit}>
					<LogoHeader />

					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
						<LabeledTextField
							name='email'
							type='text'
							placeholder='email'
							value={email}
							onChange={handleChange}
						/>
						<LabeledTextField
							name='password'
							type='password'
							placeholder='Password'
							value={password}
							onChange={handleChange}
						/>
					</Box>

					<Box sx={{ textAlign: 'right', mt: 1 }}>
						<Link href='#' underline='none' color='primary'>
							Forgot password?
						</Link>
					</Box>

					<SubmitButton loading={loading}>Log in</SubmitButton>
				</Panel>

				<FooterSignUp />
			</Box>
		</Box>
	);
};

export default Login;
