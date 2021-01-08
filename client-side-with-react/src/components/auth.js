import Cookies from 'js-cookie'

class Auth {
  constructor() {
    const auth_state = Cookies.getJSON('auth')
    if (auth_state !== undefined && auth_state.authenticated === true) {
      this.authenticated = true;
      this.user = auth_state.user;

    } else {
      this.authenticated = false;
    }
  }

  login(user, cb) {
    this.authenticated = true;
    Cookies.set('auth', {authenticated: true, user: user}, {expires: 1/48})
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
    return {authenticated: this.authenticated, user: this.user};
  }
}

export default new Auth();
  