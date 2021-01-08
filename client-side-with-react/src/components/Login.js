// import { useEffect, useState } from "react";
import {connect} from "react-redux"
import auth from '../components/auth'
import Button from '@material-ui/core/Button';
import { useState } from "react";
import axios from "axios"

function Login(props) {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    // console.log(props.auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(login, password)
        axios.post('http://localhost:8080/login', {login: login, password: password})
        .then(result => {
            if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
                props.login(login)
                auth.login(login, ()=>props.history.push("/dashboard"))
            } else {
                alert(result.data.msg)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="all">
            <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px"}}>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
            </nav>
            <form onSubmit={(e) => handleSubmit(e)} style={{display: "flex", flexDirection: "column"}}>
                <label>Login</label>
                <input type="text" onChange={(e) => setLogin(e.target.value)}></input>
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <Button variant="contained" color="primary" type="submit">Log in</Button>
            </form>
            {/* <Button variant="contained" color="primary" onClick={()=>{auth.login(()=>props.history.push("/dashboard"))}}>Log in</Button> */}
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
        login: (login) => dispatch(({type: "LOG_IN", payload: login})),
        logout: () => dispatch(({type: "LOG_OUT"}))
    }
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);