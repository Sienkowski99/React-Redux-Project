import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'

const Home = () => {
    return (
        <div className="all">
            <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px"}}>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
            </nav>
            <h2>Welcome to home page</h2>
            <div style={{display: "flex", flexDirection: "column"}}>

            </div>
            {/* <Link to="/login"><p>Log in</p></Link> */}
            <Button variant="contained" color="primary" href="/login">Log in</Button>
            <br/>
            <br/>
            <Button variant="contained" color="primary" href="/register">Register</Button>
            {/* <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Link to="/login"></Link>
                <Button href="/login">Log in</Button>
                <Button href="/register">Register</Button>
            </ButtonGroup> */}
        </div>
    )
}
export default Home;