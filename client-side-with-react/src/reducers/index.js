import {combineReducers} from "redux"
import authReducer from './auth'
import yearReducer from './year'


const rootReducer = combineReducers({
    auth: authReducer,
    year: yearReducer
});

export default rootReducer;
