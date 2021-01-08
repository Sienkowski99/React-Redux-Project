import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import { connect } from "react-redux";
import operations from '../operations/index'

const ProtectedRoute = ({component: Component, ...rest}) => {
    // if (auth.isAuthenticated().authenticated) {
    //     // rest.login(auth.isAuthenticated().user)
    // }
    console.log(rest)
    return <Route {...rest} render={props => {
        // if (!rest.auth.authenticated) {
        if (!auth.isAuthenticated().authenticated) {
            return <Component {...props} />;
        }
        else {
            // props.login(auth.isAuthenticated().user)
            return <Redirect to={{pathname: "/dashboard", state: {from: props.location}}}/>
        }
    }}/>
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (login) => dispatch(operations.login(login)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
