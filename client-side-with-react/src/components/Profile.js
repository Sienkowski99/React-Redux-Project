import auth from '../components/auth'
// import Button from '@material-ui/core/Button';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import PostPreview from './PostPreview'
import operations from '../operations'
import { Navbar, Nav, Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const Profile = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("updating")
        const data = new FormData()
        // data.append("msg", "jaiowdja")
        // data.append("avatar", file)
        // axios.post('http://localhost:8080/upload_avatar', data, {headers: {
        //     'Content-Type': "multipart/form-data"
        // }}).then(result => console.log(result)).catch(err => console.log(err))
    }
    const [file, setFile] = useState()
    useEffect(()=>{
        const today = new Date()
        props.get_posts_from_year(today.getFullYear(), today.getMonth())
    },[])
    return (
        <div className="all">
            <Navbar expand="lg" style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE"}}>
            <LinkContainer to="/" style={{color: "#FFF1CE", fontSize: "25px"}}><Navbar.Brand style={{color: "#FFF1CE", fontSize: "25px"}}>Friends Schedule</Navbar.Brand></LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <LinkContainer to="/dashboard"><Nav.Link>💻 Dashboard</Nav.Link></LinkContainer>
                <LinkContainer to="/profile"><Nav.Link>👤 Profile</Nav.Link></LinkContainer>
                </Nav>
                <Button variant="danger" onClick={()=>{props.logout(); auth.logout(()=>props.history.push("/"))}}>Log out</Button>
            </Navbar.Collapse>
            </Navbar>
            {/* <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Link to="/dashboard"><h1>Dashboard</h1></Link>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
                <Button variant="contained" color="primary" onClick={()=>{auth.logout(()=>props.history.push("/"))}}>Log out</Button>
            </nav> */}
            <h1>Welcome to your profile!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>File </label>
                    <input type="file" id="file" accept=".jpg" onChange={(e)=>{setFile(e.target.files[0])}}/>
                </div>
                <button type="submit">upload</button>
            </form>
            <br/>
            <h1>Your posts</h1>
            <div style={{margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", width: "70%"}}>
                {props.year.posts && props.year.posts.filter(post=>post.author === props.auth.user).length ? props.year.posts.filter(post=>post.author === props.auth.user).map(post=><PostPreview post={post}/>) : <p>NOT FOUND</p>}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        year: state.year,
        auth: state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_posts_from_year: (year, month) => dispatch(operations.get_posts_from_year(year, month)),
        logout: () => dispatch(operations.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);