import { setMessages } from '../redux/chatSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../helpers/api';

const useGetAllMessage = () => {
	const dispatch = useDispatch();
	const { selectedUser } = useSelector(store => store.auth);
	useEffect(() => {
		const fetchAllMessage = async () => {
			try {
				const { data } = await api.get(`message/all/${selectedUser?._id}`);
				if (data?.success) {
					dispatch(setMessages(data?.messages));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllMessage();
	}, [selectedUser]);
};
export default useGetAllMessage;
