import {combineReducers} from "redux"
import authReducer from './auth'
import yearReducer from './year'
import postsReducer from './posts'


const rootReducer = combineReducers({
    auth: authReducer,
    year: yearReducer,
    posts: postsReducer
});

export default rootReducer;
