import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPosts } from '../redux/postSlice';
import { api } from '../helpers/api';

export function useGetAllPost() {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchAllPost = async () => {
			try {
				const { data } = await api.get('/post/all');
				if (data?.success) dispatch(setPosts(data.posts));
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllPost();
	}, [dispatch]);
}
