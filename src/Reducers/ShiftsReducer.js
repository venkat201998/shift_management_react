export const shiftsReducer = (state = null, action) => {
	switch (action.type) {
		case 'SHIFTS':
			return action.payload;
		case 'LOGOUT':
			return action.payload;
		default:
			return state;
	}
};
