import Cookies from 'js-cookie'
import auth from '../components/auth'

const authReducer = (state = {authenticated: false}, action) => {
    console.log(action.type)
    let x = state
    switch(action.type) {
        case 'LOG_IN':
            // let x = state
            x.authenticated = true
            console.log(x)
            Cookies.set('auth', {authenticated: true})
            return {...x}
        case 'LOG_OUT':
            // let x = state
            x.authenticated = false
            console.log(x)
            Cookies.remove('auth')
            return {...x}
        default:
            return state
    }
};

export default authReducer; 
