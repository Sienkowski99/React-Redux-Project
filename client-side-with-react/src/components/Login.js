// import { useEffect, useState } from "react";
import {connect} from "react-redux"
import auth from '../components/auth'
// import Button from '@material-ui/core/Button';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Card } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

function Login(props) {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    // console.log(props.auth)
    const api_url = "http://10.45.3.171/api"
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(login, password)
        axios.post(`${api_url}/login`, {login: login, password: password})
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
            <Navbar expand="lg" style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE"}}>
            <LinkContainer to="/" style={{color: "#FFF1CE", fontSize: "25px"}}><Navbar.Brand style={{color: "#FFF1CE", fontSize: "25px"}}>Friends Schedule</Navbar.Brand></LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                    <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px"}}>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
            </nav> */}
            {/* <form onSubmit={(e) => handleSubmit(e)} style={{display: "flex", flexDirection: "column"}}>
                <label>Login</label>
                <input type="text" onChange={(e) => setLogin(e.target.value)}></input>
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <Button variant="success" color="primary" type="submit">Log in</Button>
            </form> */}
            <div style={{display: "flex", flexDirection: "column", margin: "100px auto", padding: "auto", justifyContent: "center", alignItems: "center"}}>
                <Card
                    bg={"light"}
                    text={"dark"}
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>Log In</Card.Header>
                    <Card.Body>
                    <Card.Title>You have to log in to be able to use Friends Schedule</Card.Title>
                    <form onSubmit={(e) => handleSubmit(e)} style={{display: "flex", flexDirection: "column"}}>
                        <label>Login</label>
                        <input type="text" onChange={(e) => setLogin(e.target.value)}></input>
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <br/>
                        <Button variant="success" color="primary" type="submit">Log in</Button>
                        <br/>
                        <p style={{fontSize: "12px"}}>Don't have an account?</p>
                        <Link to="/register"><p style={{fontSize: "12px"}}>REGISTER</p></Link>
                    </form>
                    {/* <form onSubmit={(e) => handleSubmit(e)} style={{display: "flex", flexDirection: "column"}}>
                        <label>Login</label>
                        <input type="text" onChange={(e) => setLogin(e.target.value)}></input>
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                        <label>Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
                        <br/>
                        <Button variant="primary" color="primary" type="submit">Register</Button>
                        <br/>
                        <p style={{fontSize: "12px"}}>Already have an account?</p>
                        <Link to="/login"><p style={{fontSize: "12px"}}>LOG IN</p></Link>
                    </form> */}
                    </Card.Body>
                </Card>
            </div>
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