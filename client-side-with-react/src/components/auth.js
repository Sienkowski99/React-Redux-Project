import Cookies from 'js-cookie'

class Auth {
  constructor() {
    const auth_state = Cookies.getJSON('auth')
    if (auth_state !== undefined && auth_state.authenticated === true) {
      this.authenticated = true;

    } else {
      this.authenticated = false;
    }
  }

  login(cb) {
    this.authenticated = true;
    Cookies.set('auth', {authenticated: true}, {expires: 1/48})
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    Cookies.remove('auth')
    cb();
  }

  register(cb) {
    console.log("registry")
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
  