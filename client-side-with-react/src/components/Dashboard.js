// import {connect} from "react-redux"
// import { Redirect } from "react-router-dom"
import auth from '../components/auth'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import SacrificeForm from './SacrificeForm'
import { connect } from "react-redux";

function Dashboard(props) {
    // console.log(props.auth)

    
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
        </div>
    )
}

function mapStateToProps(state) {
    return {
        displayedDaysReducer: state.displayedDays,
        auth: state.auth,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        nextMonth: () => dispatch(({type: "NEXT_Month"})),
        prevMonth: () => dispatch(({type: "PREV_Month"}))
    }
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// export default connect()(Dashboard);