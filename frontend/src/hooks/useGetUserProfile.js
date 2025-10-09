import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../redux/authSlice';
import { api } from '../helpers/api';

const useGetUserProfile = userId => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const { data } = await api.get(`/user/${userId}/profile`);
				if (data?.success) dispatch(setUserProfile(data.user));
			} catch (error) {
				console.log(error);
			}
		};
		if (userId) fetchUserProfile();
	}, [userId, dispatch]);
};
export default useGetUserProfile;
