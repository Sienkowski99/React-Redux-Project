// import {connect} from "react-redux"
// import { Redirect } from "react-router-dom"
import auth from '../components/auth'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import SacrificeForm from './SacrificeForm'
import { connect } from "react-redux";
import axios from 'axios';
import { useEffect } from 'react';
import MonthDisplay from './MonthDisplay'
import operations from '../operations/index'


function Dashboard(props) {
    // console.log(props.auth)
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
        console.log(today.getFullYear())
        props.setYear(today.getFullYear(), months[today.getMonth()])
        // axios.post("http://localhost:8080/get_year", {year: today.getFullYear()}).then(result => {
        //     props.setYear(today.getFullYear(), months[today.getMonth()])
        // })
    },[])
    
    
    return (
        <div className="all">
            <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Link to="/profile"><h1>Profile</h1></Link>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
                <Button variant="contained" color="primary" onClick={()=>{auth.logout(()=>props.history.push("/"))}}>Log out</Button>
            </nav>
            <h1>Dashboard</h1>  
            <br/>
            <SacrificeForm/>
            {/* <button onClick={()=>{props.nextMonth()}}>SNO</button> */}
            {props.year.month_to_display ? <MonthDisplay/> : null}
            
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
        // nextMonth: (month) => dispatch(({type: "NEXT_MONTH", payload: {month: month}})),
        // prevMonth: (month) => dispatch(({type: "PREV_MONTH", payload: {month: month}})),
        // nextYear: () => dispatch(({type: "NEXT_YEAR"})),
        // prevYear: () => dispatch(({type: "PREV_YEAR"})),
        // swapYear: (year, month) => dispatch(({type: "SWAP", payload: {year: year, month_to_display: month}}))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);