import { useParams } from "react-router-dom";
import Post from "./Post"
import auth from '../components/auth'
// import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import operations from '../operations/index'
import { connect } from "react-redux";
import { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const ViewPost = (props) => {
    useEffect(()=>{
        const today = new Date()
        props.get_posts_from_year(today.getFullYear(), today.getMonth())
    },[])
    
    const params = useParams()
    console.log(params.postId)
    console.log(props.location.post)
    // const post = props.year.posts.filter(post=>post.id === params.postId)
    // console.log(post)
    return (
        <div>
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
            <div>   
                {props.year.posts && props.year.posts.filter(post=>post.id === params.postId).length ? <Post post={props.year.posts.filter(post=>post.id === params.postId)[0]}/> : <p>NOT FOUND</p>}
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
        setYear: (year, month) => dispatch(operations.getYearAndMonth(year, month)),
        likePost: (id) => dispatch(operations.likePost(id)),
        dislikePost: (id) => dispatch(operations.dislikePost(id)),
        addComment: (id, content, author) => dispatch(operations.addComment(id, content, author)),
        get_posts_from_year: (year, month) => dispatch(operations.get_posts_from_year(year, month))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);