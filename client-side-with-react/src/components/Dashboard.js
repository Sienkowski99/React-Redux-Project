import auth from '../components/auth'
import SacrificeForm from './SacrificeForm'
import { useEffect } from 'react';
import MonthDisplay from './MonthDisplay'
import operations from '../operations/index'
import { connect } from "react-redux";
import { Navbar, Nav, Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


function Dashboard(props) {
    // console.log(props.year)
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

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
                <Link to="/profile"><h1>Profile</h1></Link>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
                <Button variant="contained" color="primary" onClick={()=>{props.logout(); auth.logout(()=>props.history.push("/"))}}>Log out</Button>
            </nav> */}
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                {/* <h1>Dashboard</h1>   */}
                {/* <br/> */}
                <SacrificeForm user={props.auth.user}/>
                {/* <button onClick={()=>{props.nextMonth()}}>SNO</button> */}
                {props.year.month_to_display ? <MonthDisplay/> : null}
            </div> 
        </div>
    )
}

function mapStateToProps(state) {
    return {
        month: state.displayedDays,
        year: state.year,
        auth: state.auth,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setYear: (year, month) => dispatch(operations.getYearAndMonth(year, month)),
        logout: () => dispatch(operations.logout()),
        // nextMonth: (month) => dispatch(({type: "NEXT_MONTH", payload: {month: month}})),
        // prevMonth: (month) => dispatch(({type: "PREV_MONTH", payload: {month: month}})),
        // nextYear: () => dispatch(({type: "NEXT_YEAR"})),
        // prevYear: () => dispatch(({type: "PREV_YEAR"})),
        // swapYear: (year, month) => dispatch(({type: "SWAP", payload: {year: year, month_to_display: month}}))
        get_posts_from_year: (year, month) => dispatch(operations.get_posts_from_year(year, month))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);