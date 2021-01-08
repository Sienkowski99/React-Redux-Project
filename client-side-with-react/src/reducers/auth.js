import Cookies from 'js-cookie'
import auth from '../components/auth'

const authReducer = (state = {authenticated: false, user: null}, action) => {
    // console.log(action.type)
    let x = state
    switch(action.type) {
        case 'SIEMA':
            console.log("SIEMA")
            return state
        case 'LOG_IN':
            // let x = state
            // x.authenticated = true
            // console.log(x)s
            // Cookies.set('auth', {authenticated: true})
            // if (!state.authenticated) {
            //     return {authenticated: true, user: action.payload}
            // }
            return {authenticated: true, user: action.payload}
        case 'LOG_OUT':
            // let x = state
            // x.authenticated = false
            // console.log(x)
            // Cookies.remove('auth')
            return {authenticated: false, user: null}
        default:
            return state
    }
};

export default authReducer; 
