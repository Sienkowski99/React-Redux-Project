// import { useEffect, useState } from "react";
import {connect} from "react-redux"
import auth from '../components/auth'
import Button from '@material-ui/core/Button';

function Login(props) {
    console.log(props.auth)
    return (
        <div className="all">
            <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px"}}>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
            </nav>
            <Button variant="contained" color="primary" onClick={()=>{auth.login(()=>props.history.push("/dashboard"))}}>Log in</Button>
        </div>
    )
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);