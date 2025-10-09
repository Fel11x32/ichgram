import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile, setAuthUser } from '../redux/authSlice';
import { api } from '../helpers/api';
import { useToast } from './useToast';

export const useFollow = targetId => {
	const dispatch = useDispatch();
	const { user, userProfile } = useSelector(store => store.auth);
	const [loading, setLoading] = useState(false);
	const toast = useToast()

	const isFollowing = useMemo(() => {
		const meId = String(user?._id || '');
		const followers = userProfile?.followers || [];
		const watchingSameProfile =
			String(userProfile?._id || '') === String(targetId || '');
		return !!targetId && watchingSameProfile
			? followers.map(String).includes(meId)
			: (user?.following || []).map(String).includes(String(targetId || ''));
	}, [
		user?._id,
		user?.following,
		userProfile?._id,
		userProfile?.followers,
		targetId,
	]);

	const toggleFollow = async () => {
		if (!targetId || !user?._id || loading) return;

		const prevProfile = userProfile;
		const prevUser = user;

		const meId = String(user._id);
		const tId = String(targetId);

		const watchingSameProfile = String(userProfile?._id || '') === tId;

		const nextFollowers = isFollowing
			? (userProfile?.followers || []).filter(id => String(id) !== meId)
			: [...(userProfile?.followers || []), meId];

		const nextMyFollowing = isFollowing
			? (user?.following || []).filter(id => String(id) !== tId)
			: [...(user?.following || []), tId];

		if (watchingSameProfile && userProfile) {
			dispatch(setUserProfile({ ...userProfile, followers: nextFollowers }));
		}
		dispatch(setAuthUser({ ...user, following: nextMyFollowing }));

		try {
			setLoading(true);
			await api.post(`/user/followorunfollow/${tId}`);
		} catch (error) {
			if (watchingSameProfile && prevProfile)
				dispatch(setUserProfile(prevProfile));
			dispatch(setAuthUser(prevUser));
			toast.error(error?.response?.data?.message || 'Follow failed');
		} finally {
			setLoading(false);
		}
	};

	return { isFollowing, toggleFollow, loading };
};
