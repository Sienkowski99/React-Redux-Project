import {combineReducers} from "redux"
import authReducer from './auth'
import displayedDaysReducer from './displayedDays'

const rootReducer = combineReducers({
    auth: authReducer,
    displayedDays: displayedDaysReducer,
});

export default rootReducer;
