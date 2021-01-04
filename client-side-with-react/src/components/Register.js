// import { useEffect, useState } from "react";
import {connect} from "react-redux"
import { Redirect } from "react-router-dom"
import auth from '../components/auth'
import Button from '@material-ui/core/Button';
import { useState } from "react";
import axios from 'axios'

function Register(props) {
    // console.log(props.auth)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(login, password)
        axios.post('http://localhost:8080/register', {login: login, password: password, email: email})
        .then(result => {
            if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
                alert(result.data.msg)
                props.history.push("/login")
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
                <label>Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
                <Button variant="contained" color="primary" type="submit">Register</Button>
            </form>
            {/* <Button variant="contained" color="primary" onClick={()=>{auth.register(()=>props.history.push("/login"))}}>Register</Button> */}
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);