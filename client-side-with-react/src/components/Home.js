import {Link} from 'react-router-dom'
// import Button from '@material-ui/core/Button';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Card } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { light } from '@material-ui/core/styles/createPalette'

const Home = () => {
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
            {/* <h2>Welcome to home page</h2> */}
            <div style={{display: "flex", flexDirection: "column", margin: "100px auto", padding: "auto", justifyContent: "center", alignItems: "center"}}>
                <Card
                    bg={"light"}
                    text={"dark"}
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>Welcome to Friends Schedule!</Card.Header>
                    <Card.Body>
                    <Card.Title>Let's start</Card.Title>
                    <Card.Text>
                        Already have an account?
                    </Card.Text>
                    <Button variant="info" color="primary" href="/login">Log in</Button>
                    <Card.Text>
                        If not, register by clicking on the button down below
                    </Card.Text>
                    <Button variant="info" color="primary" href="/register">Register</Button>
                    </Card.Body>
                </Card>
            </div>
            
            {/* <Link to="/login"><p>Log in</p></Link> */}
            {/* <Button variant="info" color="primary" href="/login">Log in</Button>
            <br/>
            <br/>
            <Button variant="info" color="primary" href="/register">Register</Button> */}
            {/* <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Link to="/login"></Link>
                <Button href="/login">Log in</Button>
                <Button href="/register">Register</Button>
            </ButtonGroup> */}
        </div>
    )
}
export default Home;