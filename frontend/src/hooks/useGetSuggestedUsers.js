import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSuggestedUsers } from '../redux/authSlice';
import { api } from '../helpers/api';

const useGetSuggestedUsers = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchSuggestedUsers = async () => {
			try {
				const { data } = await api.get('/user/suggested');
				if (data?.success) dispatch(setSuggestedUsers(data.users));
			} catch (error) {
				console.log(error);
			}
		};
		fetchSuggestedUsers();
	}, [dispatch]);
};
export default useGetSuggestedUsers;
