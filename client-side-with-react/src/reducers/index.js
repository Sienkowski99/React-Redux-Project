import {combineReducers} from "redux"
import authReducer from './auth'
import displayedDaysReducer from './displayedDays'
import yearReducer from './year'


const rootReducer = combineReducers({
    auth: authReducer,
    displayedDays: displayedDaysReducer,
    year: yearReducer
});

export default rootReducer;
