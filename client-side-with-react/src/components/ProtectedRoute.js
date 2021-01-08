import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import { connect } from "react-redux";
import operations from '../operations/index'

const ProtectedRoute = ({component: Component, ...rest}) => {
    // console.log(rest)
    if (auth.isAuthenticated().authenticated && !rest.auth.authenticated) {
        rest.login(auth.isAuthenticated().user)
    }
    console.log("REST"+JSON.stringify(rest)+"\n\n"+JSON.stringify(auth.isAuthenticated().authenticated))
    console.log("ACCESSING PROTECTED ROUTE")
    return <Route {...rest} render={props => {
        // if (rest.auth.authenticated) {
        if (auth.isAuthenticated().authenticated) {
            // console.log("DNIAUHWUDHAUIHWDUHAW"+JSON.stringify(props))
            // props.login(auth.isAuthenticated().user)
            // dispatch(operations.login(auth.isAuthenticated().user))
            return <Component {...props} />;
        }
        else {
            return <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
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
