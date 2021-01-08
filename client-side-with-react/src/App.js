import './App.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ReverseProtectedRoute from './components/ReverseProtectedRoute'
import NotFound from './components/NotFound'
import { connect } from 'react-redux';
import Cookies from 'js-cookie'
import {useEffect} from 'react'
// import {Link, Router} from 'react-router-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import operations from './operations/index'


import Home from './components/Home'
import Profile from './components/Profile'
import Register from './components/Register'

function App(props) {

  // useEffect(()=>{
  //   const auth_state = Cookies.getJSON('auth')
  //   console.log(auth_state)
  //   if (auth_state !== undefined && auth_state.authenticated === true) {
  //     // this.authenticated = true;
  //     // this.user = auth_state.user;
  //     props.login(auth_state.user)
  //   } else {
  //     // this.authenticated = false;
  //     props.logout()
  //   }
  // }, [])

  return (
    <div className="App">
      <BrowserRouter>
        {/* <header>
          <h1 style={{backgroundColor: "lightgray", margin: "0", borderBottom: "solid black 2px", padding: "5px"}}>Friends Schedule</h1>
        </header> */}
        <Switch>
          <ReverseProtectedRoute exact path='/' component={Home}/>
          <ReverseProtectedRoute exact path='/login' component={Login}/>
          <ReverseProtectedRoute exact path='/register' component={Register}/>
          {/* <ReverseProtectedRoute exact path='/register' component={Register}/> */}
          <ProtectedRoute exact path='/profile' component={Profile}/>
          <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function mapStateToProps(state) {
  return {
      auth: state.auth,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (login) => dispatch(operations.login(login)),
      logout: () => dispatch(operations.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
