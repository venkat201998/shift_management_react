import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { shiftsReducer } from './ShiftsReducer';

const rootReducer = combineReducers({
    user: userReducer,
    shifts: shiftsReducer
});

export default rootReducer;
