// import { useEffect, useState } from "react";
import {connect} from "react-redux"
import { Redirect } from "react-router-dom"
import auth from '../components/auth'
// import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";
import axios from 'axios'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Card } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import { Formik } from 'formik';

function Register(props) {
    // console.log(props.auth)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [smShow, setSmShow] = useState(false);
    const [alert, setAlert] = useState("")
    const [alertTitle, setAlretTitle] = useState("")
    const handleShow = () => {setSmShow(true)}
    const handleHide = () => {setSmShow(false)}
    const [registered, setRegistered] = useState(false)
    // const api_url = "http://10.45.3.171/api"
    const api_url = "http://localhost:8080"
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(login, password)
        axios.post(`${api_url}/register`, {login: login, password: password, email: email})
        .then(result => {
            if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
                setAlert(result.data.msg)
                setAlretTitle("💪 Nice!")
                setSmShow(true)
                // alert(result.data.msg)
                // props.history.push("/login")
            } else {
                setAlert(result.data.msg)
                setAlretTitle("👀 Ooopsie")
                setSmShow(true)
                // alert(result.data.msg)
            }
        })
        .catch(err => console.log(err))
    }
    const handleSubmit2 = (values) => {
        // e.preventDefault()
        // console.log(login, password)
        axios.post(`${api_url}/register`, {login: values.login, password: values.password, email: values.email})
        .then(result => {
            if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
                setAlert(result.data.msg)
                setAlretTitle("💪 Nice!")
                setSmShow(true)
                // alert(result.data.msg)
                // props.history.push("/login")
            } else {
                setAlert(result.data.msg)
                setAlretTitle("👀 Ooopsie")
                setSmShow(true)
                // alert(result.data.msg)
            }
        })
        .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (registered && alert === "Now you have to log in") {
            props.history.push("/login")
        }
    }, [registered, alert])

    return (
        <>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => {setSmShow(false);setRegistered(true)}}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                {alertTitle}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>{alert}</Modal.Body>
            </Modal>
            <div className="all">
                {/* <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px"}}>
                    <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
                </nav> */}
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
                {/* <form onSubmit={(e) => handleSubmit(e)} style={{display: "flex", flexDirection: "column"}}>
                    <label>Login</label>
                    <input type="text" onChange={(e) => setLogin(e.target.value)}></input>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
                    <Button variant="primary" color="primary" type="submit">Register</Button>
                </form> */}
                <div style={{display: "flex", flexDirection: "column", margin: "100px auto", padding: "auto", justifyContent: "center", alignItems: "center"}}>
                    <Card
                        bg={"light"}
                        text={"dark"}
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Register</Card.Header>
                        <Card.Body>
                        <Card.Title>You have to register to be able to use Friends Schedule</Card.Title>
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
                            <Formik
                                initialValues={{
                                        login: '',
                                        password: '',
                                        password2: '',
                                        email: ''
                                    }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.login) {
                                        errors.login = 'Required!';
                                    }
                                    else if (!/^([A-Za-z\d]){5,}$/.test(values.login)) {
                                        errors.login = 'Login has to be at least 5 characters long!';
                                    }
                                    if (!values.password) {
                                        errors.password = 'Required!';
                                    }
                                    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
                                        errors.password = 'Password has to contain minimum eight characters, at least one letter and one number!';
                                    }
                                    if (values.password !== values.password2) {
                                        errors.password2 = 'Passwords do not match!';
                                    }
                                    if (!values.email) {
                                        errors.email = 'Required!'
                                    }
                                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                        errors.email = 'Invalid email address!';
                                    }
                                    return errors;
                                }}
                                onSubmit= {(values,) => {
                                    // console.log("LOL")
                                    // // alert(JSON.parse(values))
                                    // console.log(values)
                                    // e.preventDefault()
                                    // console.log(login, password)
                                    // axios.post(`${api_url}/register`, {login: values.login, password: values.password, email: values.email})
                                    // .then(result => {
                                    //     if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
                                    //         setAlert(result.data.msg)
                                    //         setAlretTitle("💪 Nice!")
                                    //         setSmShow(true)
                                    //         // alert(result.data.msg)
                                    //         // props.history.push("/login")
                                    //     } else {
                                    //         setAlert(result.data.msg)
                                    //         setAlretTitle("👀 Ooopsie")
                                    //         setSmShow(true)
                                    //         // alert(result.data.msg)
                                    //     }
                                    // })
                                    // .catch(err => console.log(err))
                                    handleSubmit2(values)
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleSubmit,
                                }) => (
                                <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
                                    <label>Login</label>
                                    <input
                                        type="text"
                                        name="login"
                                        onChange={handleChange}
                                        value={values.login}
                                    />
                                    {errors.login && touched.login && errors.login}
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    {errors.password && touched.password && errors.password}
                                    <label>Repeat Password</label>
                                    <input
                                        type="password"
                                        name="password2"
                                        onChange={handleChange}
                                        value={values.password2}
                                    />
                                    {errors.password2 && touched.password2 && errors.password2}
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email && errors.email}
                                    <br/>
                                    <Button variant="primary" color="primary" type="submit">Register</Button>
                                    <br/>
                                    <p style={{fontSize: "12px"}}>Already have an account?</p>
                                    <Link to="/login"><p style={{fontSize: "12px"}}>LOG IN</p></Link>
                                </form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </div>
                {/* <Button variant="contained" color="primary" onClick={()=>{auth.register(()=>props.history.push("/login"))}}>Register</Button> */}
            </div>
        </>
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