import {connect} from 'react-redux'
import operations from '../operations/index'

const MonthDisplay = (props) => {

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

    const handleNext = () => {
        // console.log(props.month)
        // console.log(months.indexOf(props.month.name))
        if (months.indexOf(props.year.month_to_display.name)+1>11){
            // props.nextYear()
            console.log("next_year")
            props.setYear(props.year.name+1, months[0])
        } else {
            console.log("next_month")
            props.setMonth(props.year, months[months.indexOf(props.year.month_to_display.name)+1])
        }
    } 

    const handlePrevious = () => {
        // console.log(props.month)
        // console.log(months.indexOf(props.month.name))
        if (months.indexOf(props.year.month_to_display.name)-1<0){
            // props.prevYear()
            console.log("prev_year")
            props.setYear(props.year.name-1, months[11])
        } else {
            console.log("prev_month")
            console.log(months.indexOf(props.year.month_to_display))
            console.log(months[months.indexOf(props.year.month_to_display)-1])
            props.setMonth(props.year, months[months.indexOf(props.year.month_to_display.name)-1])
        }
        console.log("prev")
    } 

    return (
        <div
            id="datesElement"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "40%",
                borderLeft: "solid white 2px",
                borderRight: "solid white 2px",
                padding: "0 40px",
            }}
            >
                <div 
                style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                }}
                >
                    <button
                    style={{
                        backgroundColor: "#e7e7e7",
                        color: "black",
                        border: "none",
                        padding: "5px 10px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "15px",
                        fontWeight: "bold",
                        borderRadius: "10%",
                    }}
                    onClick={handlePrevious}
                    >
                    🢀 Previous
                    </button>
                    <h2>{props.year.month_to_display.name} of {props.year.name}</h2>
                    <button
                    style={{
                        backgroundColor: "#e7e7e7",
                        color: "black",
                        border: "none",
                        padding: "5px 10px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "15px",
                        fontWeight: "bold",
                        borderRadius: "10%",
                    }}
                    onClick={handleNext}
                    >
                    Next 🢂
                    </button>
                </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        // month: state.displayedDays,
        year: state.year,
        auth: state.auth,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setYear: (year, month) => dispatch(operations.getYearAndMonth(year, month)),
        setMonth: (year, month) => dispatch(operations.changeMonth(year, month)),
        // nextMonth: (month) => dispatch(({type: "NEXT_MONTH", payload: {month: month}})),
        // prevMonth: (month) => dispatch(({type: "PREV_MONTH", payload: {month: month}})),
        // nextYear: () => dispatch(({type: "NEXT_YEAR"})),
        // prevYear: () => dispatch(({type: "PREV_YEAR"})),
        // swapYear: (year, month) => dispatch(({type: "SWAP", payload: {year: year, month_to_display: month}}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthDisplay);