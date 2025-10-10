import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isConnected: false,
	socketId: null,
};

const socketSlice = createSlice({
	name: 'socketio',
	initialState,
	reducers: {
		setConnected(state, action) {
			state.isConnected = action.payload.isConnected;
			state.socketId = action.payload.socketId ?? null;
		},
	},
});

export const { setConnected } = socketSlice.actions;
export default socketSlice.reducer;
