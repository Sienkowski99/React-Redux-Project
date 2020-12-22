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


import Home from './components/Home'
import Profile from './components/Profile'
import Register from './components/Register'

function App(props) {

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
      login: () => dispatch(({type: "LOG_IN"})),
      logout: () => dispatch(({type: "LOG_OUT"}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
