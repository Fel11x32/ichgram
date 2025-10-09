import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPosts } from '../redux/postSlice';

export function useGetAllPost() {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchAllPost = async () => {
			try {
				const { data } = await axios.get(
					'http://localhost:8000/api/v1/post/all',
					{ withCredentials: true }
				);
				if (data?.success) {
					dispatch(setPosts(data?.posts));
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllPost();
	}, []);
}
