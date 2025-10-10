import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/chatSlice';
import { getSocket } from '../helpers/socket';

const useGetRTM = () => {
	const dispatch = useDispatch();
	const { messages } = useSelector(store => store.chat);

	useEffect(() => {
		const socket = getSocket();
		if (!socket) return;

		const handleNewMessage = newMessage => {
			dispatch(setMessages([...messages, newMessage]));
		};

		socket.on('newMessage', handleNewMessage);

		return () => {
			socket.off('newMessage', handleNewMessage);
		};
	}, [dispatch, messages]);
};

export default useGetRTM;
